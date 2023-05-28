import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Input,
  Output,
  HostListener,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FloatLabelType } from "@angular/material/form-field";
import { OrderDialogComponent } from "src/app/order-dialog/order-dialog.component";
import { OrderDataService } from "../../services/order-data.service";
import { InvoiceDialogComponent } from "src/app/invoice-dialog/invoice-dialog.component";
import { Router } from "@angular/router";
import { PageEvent } from "@angular/material/paginator";
import { ConfirmationService, MessageService } from "primeng/api";
import { log } from "console";

export interface Ordre {
  idOrder: number;
  quantity: number;
  orderNum: string;
  clientId: string;
  productionParts: ProductionPart[];
}
export interface Invoice {
  invoiceid: number;
  quantity: number;
  clientId: string;
  orders: ProductionPart[];
}
export interface ProductionPart {
  partid: string;
  title: string;
  qtyRequested: number;
}
@Component({
  selector: "app-ordre",
  templateUrl: "./ordre1.component.html",
  styleUrls: ["./ordre1.component.css"],
})
export class Ordre1Component implements OnInit {
  invoicesCall: any = [];
  event: any;
  res: any = [];
  length = 50;
  pageSize = 2;
  pageIndex = 0;
  spinner: boolean = true;
  pageSizeOptions = [5, 10, 25, 100];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  datasourceFiltred!: MatTableDataSource<Ordre>;
  pageEvent: PageEvent = new PageEvent();
  ordersCall: any[] = [];
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(",")
        .map((str) => +str);
    }
  }
  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialog1: MatDialog,
    private orderData: OrderDataService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.orderData.invoicesCall().subscribe((tt) => {
      this.invoicesCall = tt;
    });

    this.initOrdreData();

    this.orderForm = this._formBuilder.group({
      idOrder: new FormControl(""),
      clientPoNumber: new FormControl(""),
      quantity: new FormControl(""),
    });
  }
  @Output() orders: EventEmitter<any> = new EventEmitter();
  @HostListener("selectionOrders()")
  selectionOrders() {
    // this.ordres=this.selection.selected;
    this.orders.emit(this.selection.selected);
    this.orderData.createinvoice(this.selection.selected).subscribe((row) => {
      this.messageService.add({
        severity: "info",
        summary: "Confirmed",
        detail: "Proforma created Successfully",
      });
    });
    // window.location.reload()
    this.ngOnInit();
    //this.router.navigateByUrl('/proforma');
  }
  @Output() onSelected = new EventEmitter<any>();
  orderForm: FormGroup;
  row: any;
  displayedColumns: string[] = [
    "select",
    "idOrder",
    "clientPoNumber",
    "clientId",
    "title",
    "isbn10",
    "qtyRequested",
    "qtyDelivered",
    "Due Date",
    "bonLivraisonlId",
    "ActionsO",
  ];
  displayedColumns2: string[] = [
    "partid",
    "unitPrice",
    "qtyMin",
    "qtyMax",
    "qtyRequested",
    "qtyDelivered",
  ];
  selection = new SelectionModel<Ordre>(true, []);
  orderFormMode: string = "add";
  formatDateForForm(date: Date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }
  saveOrder() {
    console.log("save order", this.selectedOrder);
    if (this.orderFormMode == "add") {
      if (this.selectedOrder == undefined) {
        this.selectedOrder = this.orderForm.value;
        this.selectedOrder["productionParts"] = [];
      }
      let newOrder = this.selectedOrder;
      newOrder["type"] = "ONLINE";
      console.log("add new order", newOrder);
    } else if (this.orderFormMode == "edit") {
      let newOrder = this.selectedOrder;
      const updateOrder = {
        idOrder: this.selectedOrder.idOrder,
        orderNum: this.orderForm.value.orderNum,
        clientId: this.orderForm.value.clientId,
        dateExpacted: this.orderForm.value.dateExpacted,
        priorityLevel: this.orderForm.value.priorityLevel,
        status: this.orderForm.value.status,
        productionNote: this.orderForm.value.productionNote,
        productionParts: [],
      };
      console.log("update order", updateOrder);
    }
  }
  displayOrderFormDialog: boolean = false;
  selectedOrder: any;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl("auto" as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || "auto";
  }
  showOrderForm(order: Ordre) {
    this.selectedOrder = order;
    console.log("selected order => ", this.selectedOrder);
    this.orderForm.patchValue({
      orderNum: this.selectedOrder.orderNum,
      clientId: this.selectedOrder.clientId,
      dateReceipt: this.formatDateForForm(this.selectedOrder.dateReceipt),
      dateDelivered: this.formatDateForForm(this.selectedOrder.dateDelivered),
      dateExpacted: this.formatDateForForm(this.selectedOrder.dateExpacted),
      priorityLevel: this.selectedOrder.priorityLevel,
      status: this.selectedOrder.status,
      type: this.selectedOrder.type,
      productionNote: this.selectedOrder.productionNote,
    });
    this.displayOrderFormDialog = true;
  }
  clientsList = [];
  datasource!: MatTableDataSource<Ordre>;
  pageNumber = 0;
  itemCount = 0;
  recherche = "zwa";
  ordre: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  initOrdreData() {}
  ngOnInit(): void {
    this.orderData.ordersCall().subscribe((tt) => {
      this.ordersCall = Object.values(tt);
      this.ordersCall.reverse();
      var ordersToRemove = this.ordersCall.filter(
        (ord: { ordreInvoiced: boolean }) => ord.ordreInvoiced === true
      );
      ordersToRemove.forEach((ord: any) =>
        this.ordersCall.splice(
          this.ordersCall.findIndex((n: any) => n === ord),
          1
        )
      );
      this.spinner = false;
      console.log(this.ordersCall);
      this.datasource = new MatTableDataSource(this.ordersCall);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });

    console.log(this.ordersCall);
    //this.initDatatable();
  }
  // initDatatable(){
  //   this.orderData.ordersCall().subscribe((tt) => {
  //     console.warn(tt,'tt')
  //     this.ordersCall = Object.values(tt);
  //     this.ordersCall.reverse();
  //     this.spinner = false;
  //     console.log(this.ordersCall);
  //     this.datasource = new MatTableDataSource(this.ordersCall);
  //     this.datasource.paginator = this.paginator;
  //     this.datasource.sort = this.sort;

  //   });
  // }
  applyFilter($event: any) {
    this.datasource.filter = $event.target.value;
  }
  pageChanged(event: { pageIndex: any; pageSize: any }) {
    this.pageNumber = event.pageIndex;
    if (this.pageSize != event.pageSize) {
      this.pageSize = event.pageSize;
      this.pageNumber = 0;
    }
    console.log("page lllll number===", this.pageNumber);
    console.log(this.pageSize);
    this.initOrdreData();
  }
  isAllSelected() {
    if (this.datasource != undefined) {
      const numSelected = this.selection.selected.length;
      const numRows = this.datasource.data.length;
      return numSelected === numRows;
    } else {
      return false;
    }
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.datasource.data);

    console.log(this.selection);
  }
  openDialog() {
    this.dialog
      .open(OrderDialogComponent, { width: "75%" })
      .afterClosed()
      .subscribe((res) => {
        this.initOrdreData;
      });
  }

  // EditOrder(row: any) {
  //   this.orderData.getOrderForEdit(row).subscribe((resOrd:any)=>{
  //     console.log('order check res', resOrd);
  //   console.log('rowrowrow: ', row);
  //   this.orderData.getPsbyProdPartId(row['productionParts'][0].productionPartId).subscribe((res:any)=>{
  //     resOrd['packingSlips']=res;
  //     this.dialog
  //     .open(OrderDialogComponent, {
  //       width: " 100%",
  //       height: "auto",
  //       data: resOrd,
  //     })
  //     .afterClosed()
  //     .subscribe((res) => {
  //       this.initOrdreData();
  //     });
  //   });
  // });

  // }

  EditOrder(row: any) {
    this.dialog
      .open(OrderDialogComponent, {
        width: " 100%",
        height: "auto",
        data: row,
      })
      .afterClosed()
      .subscribe((res) => {
        this.initOrdreData();
      });
  }
  onSelectedOrder(ordre: Ordre) {
    console.log(ordre);
    this.onSelected.emit(ordre);
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Ordre): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.idOrder + 1
    }`;
  }
  openDialogInvoice(row: Invoice) {
    this.dialog1
      .open(InvoiceDialogComponent, { width: "60%", data: row })
      .afterClosed()
      .subscribe((res) => {});
    console.log(row);
  }
  cancel() {
    this.initOrdreData();
  }
  proformaEntity: any;
  async validate(row: any) {
    this.spinner = true;
    this.orderData.getProforma(row.idOrder).subscribe((tt) => {
      this.proformaEntity = tt;
    });
    setTimeout(() => {
      this.orderData.getProforma(row.idOrder).subscribe((tt) => {
        this.proformaEntity = tt;
      });
      this.orderData.ConfirmProforma(this.proformaEntity).subscribe((res) => {
        this.spinner = false;
        this.messageService.add({
          severity: "info",
          summary: "Confirmed",
          detail: "Invoice Confirmed",
        });
      });
    }, 1000);
    //     setTimeout(() => {
    // this.initDatatable();
    //     }, 3000);
  }
  preview(row: any) {
    this.spinner = true;
    this.orderData.getProforma(row.idOrder).subscribe((tt) => {
      this.proformaEntity = tt;
    });
    setTimeout(() => {
      this.orderData.getProforma(row.idOrder).subscribe((tt) => {
        this.proformaEntity = tt;
        console.warn(tt + "profor");
      });
      this.dialog
        .open(InvoiceDialogComponent, {
          width: "60%",
          data: this.proformaEntity,
        })
        .afterClosed()
        .subscribe((res) => {});
      this.spinner = false;
    }, 1000);
  }
  generatePDF() {}
}
