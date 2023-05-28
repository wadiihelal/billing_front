import { AfterViewInit, Component, OnInit, ViewChild ,EventEmitter, Input, Output,HostListener} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FloatLabelType} from '@angular/material/form-field';
import { delay } from 'rxjs';
import { OrderDialogComponent} from 'src/app/order-dialog/order-dialog.component';
import {OrderDataService} from '../services/order-data.service';
import {InvoiceDialogTestComponent } from 'src/app/invoice-dialog-test/invoice-dialog-test.component';
import { LazyLoadEvent} from 'primeng/api';
export interface Ordre
{
  idOrder:number,
  quantity:number,
  orderNum:string,
  clientId:string
  productionParts:ProductionPart[]
}
export interface Invoice
{
  invoiceid:number,
  quantity:number,
  clientId:string
  orders:ProductionPart[]
}
export interface ProductionPart
{
  partid:string,
  title:string
  qtyRequested:number
}
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
   invoicesCall: any = [];
      event: any;
     res:any=[];
     totalRecords: number=0;
     datasource !: MatTableDataSource<Ordre>;
 constructor(private _formBuilder: FormBuilder,public dialog: MatDialog,public dialog1: MatDialog,private orderData : OrderDataService) {
 this.orderData.invoicesCall().subscribe((tt)=>{  this.invoicesCall=tt;   });
   orderData.archiveCall().subscribe((tt)=>{
     this.ordersCall=tt;
     this.totalRecords =this.ordersCall.length;
     this.datasource=new MatTableDataSource(this.ordersCall)
     this.datasource.paginator=this.paginator
     this.datasource.sort=this.sort
   });
 this.orderForm = this._formBuilder.group({
 			idOrder: new FormControl(''),
 			clientPoNumber: new FormControl(''),
 			quantity: new FormControl(''),
 		});}
   length = this.totalRecords;
   pageSize = 10;
   pageIndex = 0;
   pageSizeOptions = [5, 10, 25];
   hidePageSize = false;
   showPageSizeOptions = true;
   showFirstLastButtons = true;
   disabled = false;
  lastTableEvent: any;
   setPageSizeOptions(setPageSizeOptionsInput: string) {
     if (setPageSizeOptionsInput) {
       this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
     }
   }


   @Output() orders: EventEmitter<any> = new EventEmitter();

     @HostListener('selectionOrders()')
     selectionOrders(){
        // this.ordres=this.selection.selected;
       this.orders.emit(this.selection.selected);
       this.orderData.createinvoiceTest(this.selection.selected).subscribe((row)=>{
             this.res=row;
             this.openDialogInvoice(this.res);
         });
     }
   @Output() onSelected = new EventEmitter<any>();
   orderForm: FormGroup;
   row:any;
   displayedColumns: string[] = ['idOrder','clientPoNumber', 'clientId','title','isbn10','qtyRequested','qtyDelivered','Due Date'];
   displayedColumns2: string[] = ['partid','unitPrice','qtyMin','qtyMax','qtyRequested','qtyDelivered'];
     selection = new SelectionModel<Ordre>(true, []);

           orderFormMode: string= 'add';

           formatDateForForm(date:Date) {
           		var d = new Date(date),
           			month = '' + (d.getMonth() + 1),
           			day = '' + d.getDate(),
           			year = d.getFullYear();
           		if (month.length < 2) month = '0' + month;
           		if (day.length < 2) day = '0' + day;
           		return [year, month, day].join('-');
           	}
           		saveOrder() {

             		console.log('save order', this.selectedOrder);

             		if (this.orderFormMode == 'add') {
             			if (this.selectedOrder == undefined) {
             				this.selectedOrder = this.orderForm.value;
             				this.selectedOrder['productionParts'] = [];
             			}
             			let newOrder = this.selectedOrder;
                   newOrder['type'] = 'ONLINE';
             			console.log('add new order', newOrder);

             		} else if (this.orderFormMode == 'edit') {
             			let newOrder = this.selectedOrder;

             			const updateOrder = {
             				idOrder: this.selectedOrder.idOrder,
             				orderNum: this.orderForm.value.orderNum,
             				clientId: this.orderForm.value.clientId,
             				dateExpacted: this.orderForm.value.dateExpacted,
             				priorityLevel: this.orderForm.value.priorityLevel,
             				status: this.orderForm.value.status,
             				productionNote: this.orderForm.value.productionNote,
             				productionParts: []
             			}

             			console.log('update order', updateOrder);

             		}
             	}
 displayOrderFormDialog: boolean = false;
 selectedOrder: any;
 ordersCall: any = [];


 hideRequiredControl = new FormControl(false);
    floatLabelControl = new FormControl('auto' as FloatLabelType);
     options = this._formBuilder.group({
       hideRequired: this.hideRequiredControl,
       floatLabel: this.floatLabelControl,
     });



     getFloatLabelValue(): FloatLabelType {

       return this.floatLabelControl.value || 'auto';
     }
     showOrderForm(order: Ordre) {

     		this.selectedOrder = order;
     		console.log('selected order => ', this.selectedOrder);

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
   pageNumber=0;
   itemCount=0;
   recherche="zwa"
   ordre:any=[]
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
   ngAfterViewInit()
   {
   }
 
   ngOnInit(): void {
   }
   initOrdreData()
   {  
     this.datasource.sort = this.sort;
   }


   async applyFilter(event: Event)
    {
     const filterValue = (event.target as HTMLInputElement).value;
     this.recherche=filterValue
     this.initOrdreData()
      await delay(2000)
   }

   pageChanged(event: { pageIndex: any; pageSize: any; })
   {
      this.pageNumber=event.pageIndex
     if(this.pageSize!=event.pageSize)
     {
       this.pageSize = event.pageSize;
       this.pageNumber=0
     }
     console.log("page lllll number===",this.pageNumber);
     console.log(this.pageSize)
     this.initOrdreData()
 }
   isAllSelected() {
     const numSelected = this.selection.selected.length;
     const numRows = this.datasource.data.length;
     return numSelected === numRows;
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
       this.dialog.open(OrderDialogComponent, { width: '75%' }).afterClosed().subscribe((res) => { this.initOrdreData });
     }

     EditOrder(row: any)
       {
         this.dialog.open(OrderDialogComponent,
           {
             width: '   1200px%',
             height:'900px',
             data: row
           }).afterClosed().subscribe((res)=>{this.initOrdreData()});
       }
  onSelectedOrder(ordre:Ordre) {
     console.log(ordre);
     this.onSelected.emit(ordre);
   }
   /** The label for the checkbox on the passed row */
   checkboxLabel(row?: Ordre): string {
     if (!row) {
       return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
     }
     return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idOrder + 1}`;
   }

  openDialogInvoice(row:Invoice) {
     this.dialog1.open(InvoiceDialogTestComponent , { width: '60%' , data: row}).afterClosed().subscribe((res) => {});
      console.log(row);
       }
  cancel(){this.initOrdreData()}
  generatePDF() { }
 }


