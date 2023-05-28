import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validator,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { OrderDataService } from "../services/order-data.service";
import { HttpClient } from "@angular/common/http";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { MessageService } from "primeng/api";
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
  selector: "app-date-invoice",
  templateUrl: "./date-invoice.component.html",
  styleUrls: ["./date-invoice.component.css"],
})
export class DateInvoiceComponent implements OnInit {
  myDatePicker!: FormGroup;
  invoices: any;
  show: boolean = false;
  datasource!: MatTableDataSource<Invoice>;
  displayedColumns2: string[] = [
    "clientPoNumber",
    "isbn",
    "clientId",
    "dueDate",
  ];
  fileTemp: string = "";

  displayedColumns: string[] = [
    "invoiceDate",
    "idInvoice",
    "clientPartNum",
    "Compte Compt",
    "Facility Code",
    "clientId",
    "Cust_INV_N°_invoiceID",
    "total",
    "customerPoNumber",
    "dueDate",
    "Transport",
  ];
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    orderData: OrderDataService,
    private dialog: MatDialog,
    private messageService: MessageService
  ) {}
  myGroup = this.formBuilder.group({
    dateStart: ["", Validators.required],
    dateEnd: ["", Validators.required],
  });
  ngOnInit(): void {}
  validate() {
    this.show = true;
    let dateStart: Date = new Date(this.myGroup.value.dateStart);
    let dateEnd: Date = new Date(this.myGroup.value.dateEnd);
    let start =
      dateStart.getFullYear() +
      "-" +
      (dateStart.getMonth() + 1) +
      "-" +
      dateStart.getDate();
    let end =
      dateEnd.getFullYear() +
      "-" +
      (dateEnd.getMonth() + 1) +
      "-" +
      dateEnd.getDate();
    let pass = start + "/" + end;
    this.fileTemp = pass;
    this.http
      .get(`http://localhost:9090/invoicesByDate/${pass}`)
      .subscribe((res: any) => {
        this.invoices = res;
        console.log(this.invoices);
      });
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }

  generate() {
    var myList = new Array();
    this.invoices.forEach((element: any) => {
      myList.push(element.idInvoice);
    });
    console.log(myList);
    this.http
      .post("http://localhost:9090/exportInvoices", myList)
      .subscribe(() => {
        //     window.location.reload()
      });

    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.invoices);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "Invoice export for all clients");
      this.dialog.closeAll();
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + "_between_" + this.fileTemp + EXCEL_EXTENSION
    );
    this.messageService.add({
      severity: "success",
      summary: "Confirmed",
      detail: "File Downloaded Successfully",
    });
  }
}
