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
import { MessageService } from "primeng/api";
import { MatDialog } from "@angular/material/dialog";
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
  selector: "app-export-client",
  templateUrl: "./export-client.component.html",
  styleUrls: ["./export-client.component.css"],
})
export class ExportClientComponent implements OnInit {
  myDatePicker!: FormGroup;
  invoices: any[] = [];
  show: boolean = false;
  loading: boolean = false;
  datasource!: MatTableDataSource<Invoice>;
  data: any;
  fileTemp: string = "";
  loading$: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService,
    private dialog: MatDialog
  ) {
    this.callClients();
  }
  myGroup = this.formBuilder.group({
    dateStart: ["", Validators.required],
    dateEnd: ["", Validators.required],
    client: ["", Validators.required],
  });
  ngOnInit(): void {
    console.log(this.invoices.length);
  }
  async callClients() {
    await this.http
      .get(`http://localhost:9090/ClientsNames`)
      .subscribe((res: any) => {
        console.log(res);
        this.data = res;
        this.loading = true;
      });
  }
  validate() {
    this.show = true;
    let client = this.myGroup.value.client;
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
      .get(
        `http://localhost:9090/invoicesByClientAndDate/${pass}/${client}`
      )
      .subscribe((res: any) => {
        this.invoices = res;
      });
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }
  generate() {
    // let element = document.getElementById("excel-table");
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    // this.datasource = new MatTableDataSource(this.invoices);
    // / generate workbook and add the worksheet /;
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // / save to file /;
    // XLSX.writeFile(wb, "ExcelSheet.xlsx");
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.invoices);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "Invoice export");
    });
    this.messageService.add;
    this.dialog.closeAll();
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
      fileName +
        "_client_" +
        this.myGroup.value.client +
        "_between_" +
        this.fileTemp +
        EXCEL_EXTENSION
    );
    this.messageService.add({
      severity: "success",
      summary: "Confirmed",
      detail: "File Downloaded Successfully",
    });
    // window.location.reload()
  }
}
