import { AfterViewInit, Component, OnInit, ViewChild , Input,HostBinding} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { delay, Observable } from 'rxjs';
import jspdf from 'jspdf';
import {MenuItem} from 'primeng/api';
import html2canvas from 'html2canvas';
import {InvoiceDialogComponent } from 'src/app/invoice-dialog/invoice-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { OrderDialogComponent} from 'src/app/order-dialog/order-dialog.component';
import { Ordre1Component } from 'src/app/components/ordre1/ordre1.component';
import {OrderDataService} from '../services/order-data.service'
import {InvoiceDialog1Component } from 'src/app/invoice-dialog1/invoice-dialog1.component';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { MatSpinner } from '@angular/material/progress-spinner';
export interface Invoice
{
  invoiceid:number,
  quantity:number,
  clientId:string
  orders:ProductionPart[]
}
export interface Ordre
{
  idOrder:number,
  quantity:number,
  orderNum:string,
  clientId:string
  productionParts:ProductionPart[]
}
export interface ProductionPart
{
  partid:string,
  title:string
  qtyRequested:number
}
@Component({
  selector: 'app-proforma',
  templateUrl: './proforma.component.html',
  styleUrls: ['./proforma.component.css']
})
export class ProformaComponent implements OnInit {


  @HostBinding('orders')
  @Input()
  orders: Ordre[]=[]
  displayinvoice: boolean = true;
  pdfLoading:boolean= false;
  pdfLoading2:boolean= false;
  spinner:boolean=false;
  displayedColumns2: string[] = ['clientPoNumber', 'isbn', 'clientId','dueDate','ActionsO'];
  displayedColumns: string[] = ['idInvoice','idOrder','isbn','customerPoNumber','clientPartNum','clientId','productionPartId','invoiceDate','ActionsO'];
  res:any=[];
  invoicesCall: any = [];
  temporar: any = [];
  ordered :any = [];
  constructor(public dialog: MatDialog,private orderData : OrderDataService,private messageService:MessageService,private confirmationService: ConfirmationService) {
    
    this.orderData.invoicesProformaCall().subscribe((tt)=>{
    this.spinner=false;
    this.ordered=tt;
    this.ordered.reverse()
    this.datasource=new MatTableDataSource(this.ordered)

      console.log(this.paginator)
  }); 
 
}
  datasource !: MatTableDataSource<Invoice>;
  pageNumber=0;
  pageSize=10;
  itemCount=0;
  recherche="zwa"
  invoice:any=[]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit()
  {
         this.datasource.paginator = this.paginator;
         this.datasource.sort = this.sort;
  }
  initInvoiceData()

  {

  }

  ngOnInit(): void {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }
  async applyFilter(event: Event)
   {
    const filterValue = (event.target as HTMLInputElement).value;
    this.recherche=filterValue
    this.initInvoiceData()
     await delay(2000)
  }
 selectionOrders(){

  }
  cancel(){
  this.initInvoiceData()}
  pageChanged(event: { pageIndex: any; pageSize: any; })
  {
     this.pageNumber=event.pageIndex
    if(this.pageSize!=event.pageSize)
    {
      this.pageSize = event.pageSize;
      this.pageNumber=0
    }
    this.initInvoiceData()
}

 EditOrder(row: any)
          {
            this.dialog.open(OrderDialogComponent,
              {
                width: '40%',
                data: row
              }).afterClosed().subscribe((res)=>{});
          }
  generatePDF() {
    this.pdfLoading = true;
    window.scrollTo(0, 0);
    setTimeout(() => {
      var data = document.getElementById('contentToPrint')!;
      html2canvas(data).then(canvas => {
        var imgWidth = 208;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('p', 'mm', [215.9,279.4]);
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight,'Invoice','FAST')
      });
      this.pdfLoading = false;
    }, 700);
  }
  openDialog(row:any) {
        this.dialog.open(InvoiceDialogComponent , { width: '60%' , data: row}).afterClosed().subscribe((res) => { this.initInvoiceData() });
        console.log(row);
 }
  createInvoiceDialog() {
         this.dialog.open(InvoiceDialog1Component , { width: '60%' }).afterClosed().subscribe((res) => { this.initInvoiceData() });
  }
  validate(row:any)
  {
     this.orderData.ConfirmProforma(row).subscribe((res)=>{
          this.initInvoiceData();
          this.messageService.add({severity:'info', summary:'Confirmed', detail:'Invoice Confirmed'});
        })
     
    row.exported=true
    console.log(row)
  }
   deleteInv(row:any)
    {
       this.orderData.deleteProforma(row.idInvoice).subscribe((res)=>{
            this.initInvoiceData();
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'Invoice Deleted'});
            setTimeout(function(){
              console.log("waited for: 2 seconds");
            }, 10000);
            window.location.reload()
            
          })
       

          //
      }
}

