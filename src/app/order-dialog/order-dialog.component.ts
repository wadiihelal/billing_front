import { HttpClient } from "@angular/common/http";
import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  HostListener,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validator,
  Validators,
  FormArray,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PsDialogComponent } from "src/app/ps-dialog/ps-dialog.component";
import { SelectionModel } from "@angular/cdk/collections";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { FloatLabelType } from "@angular/material/form-field";
import { delay } from "rxjs";
import { OrderDataService } from "../services/order-data.service";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { type } from "os";

export interface Ordre {
  idOrder: number;
  quantity: number;
  orderNum: string;
  clientId: string;
}
@Component({
  selector: "app-order-dialog",
  templateUrl: "./order-dialog.component.html",
  styleUrls: ["./order-dialog.component.css"],
})
export class OrderDialogComponent implements OnInit {
  useClientPartNumberINVOICESelected = this.editData.useClientPartNumberINVOICE;

  favoriteSeason: any;
  orderForm!: FormGroup;
  btnAction: string = "save";
  hello: string = "All checked";
  @Output() reloadTable = new EventEmitter();
  selection = new SelectionModel<Ordre>(true, []);
  myForm: any;
  setterOrder: any;
  psCall: any = [];
  displayedColumns: string[] = ["psId", "quantity"];
  row: any;
  @Output() orders: EventEmitter<any> = new EventEmitter();
  @HostListener("selectionOrders()")
  selectionOrders() {
    // this.ordres=this.selection.selected;
    this.orders.emit(this.selection.selected);
  }
  @Output() onSelected = new EventEmitter<any>();
  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private orderData: OrderDataService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private _formBuilder: FormBuilder,
    public dialog1: MatDialog,
    public dialog: MatDialog,
    private dialioRef: MatDialogRef<OrderDialogComponent>
  ) {}
  res: any = [];
  openPsDialog(row: any) {
    console.log(this.orderForm.get(["fees"])?.value, "fees");
    console.log(this.orderForm.get(["types"])?.value, "types");
    const dialogRef = this.dialog.open(PsDialogComponent, {
      width: "900px",
      data: row,
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.refresh(row);
    });
  }
  refresh(row: any) {
    this.orderData.getPsbyProdPartId(row['productionParts'][0].productionPartId).subscribe((tt) => {
      this.editData.packingSlips = tt;
      this.psCall = tt;
    });
  }

  addFees() {
    this.fees.push(this.formbuilder.control(""));
    this.types.push(this.formbuilder.control(""));
  }
  removeFees(index: number) {
    this.fees.removeAt(index);
    this.types.removeAt(index);
  }
  get fees() {
    return this.orderForm.get("fees") as FormArray;
  }
  get types() {
    return this.orderForm.get("types") as FormArray;
  }
  ngOnInit(): void {
    console.warn();

    if (this.editData.totalCost != undefined && this.editData.totalCost.length > 0) this.checked = true;
    this.orderForm = this.formbuilder.group({
      idOrder: ["", Validators.required],
      clientPoNumber: ["", Validators.required],
      isbn10: [""],
      barcode: ["", Validators.required],
      title: ["", Validators.required],
      pnlPrintingNumber: ["", Validators.required],
      orderNum: ["", Validators.required],
      shipAttn: ["", Validators.required],
      destination: [""],
      shipAccountName: [""],
      billAccountName: [""],
      billAttn: [""],
      billingCountry: [""],
      shippingCountry: [""],
      billingLocation: [""],
      shippingLocation: [""],
      billingAddress: [""],
      clientId: ["", Validators.required],
      dateExpacted: [""],
      invoiceDate: [""],
      qtyRequested: ["", Validators.required],
      qtyDelivered: ["", Validators.required],
      unitPrice: ["", Validators.required],
      status: [""],
      totalCost: [""],
      surcharge: ["0"],
      fees: this.formbuilder.array([this.formbuilder.control("")]),
      types: this.formbuilder.array([this.formbuilder.control("")]),
    });

    if (this.editData) {
      this.btnAction = "Update";
      this.orderForm.controls["idOrder"].setValue(this.editData.idOrder);
      this.orderForm.controls["clientPoNumber"].setValue(
        this.editData.clientPoNumber
      );
      this.orderForm.controls["isbn10"].setValue(
        this.editData.productionParts[0].isbn10
      );
      this.orderForm.controls["barcode"].setValue(
        this.editData.productionParts[0].barcode
      );
      this.orderForm.controls["qtyRequested"].setValue(
        this.editData.productionParts[0].qtyRequested
      );
      this.orderForm.controls["qtyDelivered"].setValue(
        this.editData.productionParts[0].qtyDelivered
      );
      this.orderForm.controls["title"].setValue(
        this.editData.productionParts[0].title
      );
      this.orderForm.controls["unitPrice"].setValue(
        this.editData.productionParts[0].unitPrice
      );
      this.orderForm.controls["pnlPrintingNumber"].setValue(
        this.editData.productionParts[0].pnl.pnlPrintingNumber
      );
      this.orderForm.controls["orderNum"].setValue(this.editData.orderNum);
      this.orderForm.controls["billAttn"].setValue(
        this.editData.packingSlips[0].shippings[0].billAttn
      );
      this.orderForm.controls["billingCountry"].setValue(
        this.editData.packingSlips[0].shippings[0].billingCountry
      );
      this.orderForm.controls["billingLocation"].setValue(
        this.editData.packingSlips[0].shippings[0].billingLocation
      );
      this.orderForm.controls["billingAddress"].setValue(
        this.editData.packingSlips[0].shippings[0].billingAddress
      );
      this.orderForm.controls["shipAttn"].setValue(
        this.editData.packingSlips[0].shippings[0].shipAttn
      );
      this.orderForm.controls["shippingCountry"].setValue(
        this.editData.packingSlips[0].shippings[0].shippingCountry
      );
      this.orderForm.controls["shippingLocation"].setValue(
        this.editData.packingSlips[0].shippings[0].shippingLocation
      );
      this.orderForm.controls["destination"].setValue(
        this.editData.packingSlips[0].shippings[0].destination
      );
      this.orderForm.controls["shipAccountName"].setValue(
        this.editData.packingSlips[0].shippings[0].shipAccountName
      );
      this.orderForm.controls["billAccountName"].setValue(
        this.editData.packingSlips[0].shippings[0].billAccountName
      );
      this.orderForm.controls["clientId"].setValue(this.editData.clientId);
    
      this.orderForm.controls["dateExpacted"].setValue(
       // this.editData.dateExpacted.substring(0, 10)
       this.editData.dateExpacted
      );
      this.orderForm.controls["invoiceDate"].setValue(
        new Date().toLocaleDateString("us")
      );
      this.orderForm.controls["status"].setValue(this.editData.status);
      this.orderForm.controls["surcharge"].setValue(this.editData.surcharge);
      this.orderForm.controls["totalCost"].setValue(this.editData.totalCost);
      this.psCall = this.editData.packingSlips;
      this.editData.fees = this.orderForm.get(["fees"])?.value;
      this.editData.types = this.orderForm.get(["types"])?.value;
    }
    var valuesToSubmit: any = [];
    var typesToSubmit: any = [];
    if (this.orderForm.value.totalCost.length > 0) {
      this.checked = true;
      for (let i = 0; i < this.orderForm.value.totalCost.length; i++) {
        var value = this.orderForm.value.totalCost[i];
        valuesToSubmit.push(value.value);
        typesToSubmit.push(value.type);
        this.fees.push(this.formbuilder.control(""));
        this.types.push(this.formbuilder.control(""));
      }
      this.fees.controls.shift();
      this.types.controls.shift();
      this.orderForm.controls["fees"].setValue(valuesToSubmit);
      this.orderForm.controls["types"].setValue(typesToSubmit);
    }
  }
  checked: boolean = false;
  toggle(e: any) {
    e.checked ? (this.checked = true) : (this.checked = false);
  }
  updateOrder() {
    let totalCost = [];
    for (let i = 0; i < this.orderForm.get(["fees"])?.value.length; i++) {
      let obj = {
        type: this.orderForm.get(["types"])?.value[i],
        value: this.orderForm.get(["fees"])?.value[i],
      };
      if (obj.type !== "" && obj.value !== "") {
        totalCost.push(obj);
      }
    }
    this.setterOrder = Object.assign(this.editData);
    this.setterOrder.idOrder = this.orderForm.value.idOrder;
    this.setterOrder.productionParts[0].unitPrice =
      this.orderForm.value.unitPrice;
    this.setterOrder.productionParts[0].isbn10 = this.orderForm.value.isbn10;
    this.setterOrder.productionParts[0].qtyDelivered =
      this.orderForm.value.qtyDelivered;
    this.setterOrder.productionParts[0].qtyRequested =
      this.orderForm.value.qtyRequested;
    this.setterOrder.productionParts[0].pnl.pnlPrintingNumber =
      this.orderForm.value.pnlPrintingNumber;
    this.setterOrder.orderNum = this.orderForm.value.orderNum;
    this.setterOrder.packingSlips[0].shippings[0].billAttn =
      this.orderForm.value.billAttn;
    this.setterOrder.packingSlips[0].shippings[0].shipAttn =
      this.orderForm.value.shipAttn;
    this.setterOrder.packingSlips[0].shippings[0].destination =
      this.orderForm.value.destination;
    this.setterOrder.packingSlips[0].shippings[0].shipAccountName =
      this.orderForm.value.shipAccountName;
    this.setterOrder.packingSlips[0].shippings[0].billAccountName =
      this.orderForm.value.billAccountName;
    this.setterOrder.packingSlips[0].shippings[0].billingCountry =
      this.orderForm.value.billingCountry;
    this.setterOrder.packingSlips[0].shippings[0].billingLocation =
      this.orderForm.value.billingLocation;
    this.setterOrder.packingSlips[0].shippings[0].billingAddress =
      this.orderForm.value.billingAddress;
    this.setterOrder.packingSlips[0].shippings[0].shippingCountry =
      this.orderForm.value.shippingCountry;
    this.setterOrder.packingSlips[0].shippings[0].shippingLocation =
      this.orderForm.value.shippingLocation;
    this.setterOrder.clientId = this.orderForm.value.clientId;
    this.setterOrder.dateExpacted = this.orderForm.value.dateExpacted;
    this.setterOrder.surcharge = this.orderForm.value.surcharge;

    this.setterOrder.productionParts = this.editData.productionParts;
    this.setterOrder.totalCost = totalCost;
    return this.setterOrder;
  }
  addOrder() {
    let x = this.updateOrder();
    console.log(x);
    this.http.post("http://localhost:9090/addOrder", x).subscribe({
      next: (response: any) => console.log(response),
      error: (error: any) => console.log(error),
    });
    window.location.reload();
  }
  finalUpdateOrder() {
    let newData = this.updateOrder();
    newData.status = "Checked";
    this.http.post("http://localhost:9090/addOrder", newData).subscribe({
      next: (response: any) => console.log(response),
      error: (error: any) => console.log(error),
    });
    window.location.reload();
  }
  deletePs(row: any) {
    this.orderData
      .deletePsFromOrder(row.psId, this.editData.idOrder)
      .subscribe((tt) => {
        this.editData.packingSlips = tt;
        this.psCall = tt;
      });
  }
}
