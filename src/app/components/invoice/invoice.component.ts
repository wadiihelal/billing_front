import { AfterViewInit, Component, OnInit, ViewChild , Input,HostBinding, Output, EventEmitter, HostListener} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { delay } from 'rxjs';
import jspdf from 'jspdf';
import {MenuItem} from 'primeng/api';
import html2canvas from 'html2canvas';
import {InvoiceDialogComponent } from 'src/app/invoice-dialog/invoice-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { OrderDialogComponent} from 'src/app/order-dialog/order-dialog.component';
import { InvoiceEditDialogueComponent} from 'src/app/invoice-edit-dialogue/invoice-edit-dialogue.component';
import { Ordre1Component } from 'src/app/components/ordre1/ordre1.component';
import {OrderDataService} from '../../services/order-data.service'
import {InvoiceDialog1Component } from 'src/app/invoice-dialog1/invoice-dialog1.component';
import {of} from 'rxjs'
import { DateInvoiceComponent } from 'src/app/date-invoice/date-invoice.component';
import {SelectionModel} from '@angular/cdk/collections';
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
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit, AfterViewInit {

    @HostBinding('orders')
    @Input()
    orders: Ordre[]=[]
    displayinvoice: boolean = true;
    datasource !: MatTableDataSource<Invoice>;
    data:any;
    selection = new SelectionModel<Invoice>(true, []);
    pdfLoading:boolean= false;
    pdfLoading2:boolean= false;
    loading:boolean= false;
    invoiceLines: any;
    invoicesLines: any;
    totalRecords: number=0;
    length = this.totalRecords;
    pageIndex = 0;
    pageSizeOptions = [5, 10, 25];
    hidePageSize = false;
    showPageSizeOptions = true;
    showFirstLastButtons = true;
    disabled = false;
    orderAbervable$ : any;
    displayedColumns2: string[] = ['clientPoNumber', 'isbn', 'clientId','dueDate','ActionsO'];
    displayedColumns: string[] = ['select','idInvoice','idOrder','isbn','clientPartNum','clientId','productionPartId','invoiceDate','exported','ActionsO'];
    res:any=[];
    invoicesCall: any = [];
    temporar : any=[];
    constructor(public dialog: MatDialog,private orderData : OrderDataService)
    {

    }

    pageNumber=0;
    pageSize=10;
    itemCount=0;
    recherche="zwa"
    invoice:any=[]
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    ngAfterViewInit()
    {
    }
    initInvoiceData()
    {
        this.datasource.sort = this.sort;
        this.orderAbervable$=of(this.datasource)

    }

    ngOnInit(): void {
        this.orderData.invoicesCall().subscribe((tt)=>{
            this.temporar=tt;
            this.temporar.reverse();
            console.warn(this.temporar,"temporar")
            // for (let i = 0; i < this.temporar.length; i++) {
            //   if(this.temporar[i].exported == false)
            //     this.temporar.splice(i,1)
            // }
            this.datasource=new MatTableDataSource(this.temporar)
            this.datasource.paginator = this.paginator;
            this.datasource.sort = this.sort;
        });

    }

    applyFilter($event: any)
    {
        this.datasource.filter=$event.target.value;


    }   
    @Output() invoices: EventEmitter<any> = new EventEmitter();
    @HostListener('selectionOrders()')
    async selectionOrders(){
        var i=0
        var data= this.selection.selected
        this.loading=false
        while(this.loading===false && i<data.length){
            this.loading=true
            this.dialog.open(InvoiceDialogComponent , { width: '60%' , data: data[i]  } )
            let print = new InvoiceDialogComponent(data[i],this.orderData)
            await print.downloadPDF()
            const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
            console.log('1');
            // Sleeps for 2 seconds.
            await sleep(2000);
            console.log('2');
            this.dialog.closeAll()
            this.loading=false
            i++

        }

        this.invoices.emit(this.selection.selected);
        //this.router.navigateByUrl('/proforma');

    }

    @Output() onSelected = new EventEmitter<any>();


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
        this.dialog.open(InvoiceDialogComponent , { width: '60%' , data: row  } ).afterClosed().subscribe(() => { 
        });
    }
    openDialog1(row: any)
    {
        this.dialog.open(InvoiceEditDialogueComponent,
            {
                width: '90%',
                height:'fit-content',
                data: row
            }).afterClosed().subscribe((res)=>{});
    }
    viewAnnulationInvoice(row:any) {
        this.orderData.annulationInvoice(row).subscribe((tt)=>{
            this.data=tt;
            this.initInvoiceData() ;
        });
        let row1=this.data;
        this.dialog.open(InvoiceDialogComponent , { width: '60%' , data:row1}).afterClosed().subscribe((res) => { this.initInvoiceData() });
    }
    createInvoiceDialog() {
        this.dialog.open(InvoiceDialog1Component , { width: '60%' }).afterClosed().subscribe((res) => { this.initInvoiceData() });

    }
    exportTableau() {
        this.dialog.open(DateInvoiceComponent , { width: 'auto', height:'auto' }).afterClosed().subscribe((res) => { this.initInvoiceData() });

    }
    isNumber(val:any): boolean { return typeof val === 'number'; }

    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        this.selection.select(...this.datasource.data);

    }
    isAllSelected() {
        if(this.datasource != undefined){
        const numSelected = this.selection.selected.length;
        const numRows = this.datasource.data.length;
        return numSelected === numRows;
      }else{
        return false;
      }
    }
    checkboxLabel(row?: Invoice): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.invoiceid + 1}`;
    }
}

