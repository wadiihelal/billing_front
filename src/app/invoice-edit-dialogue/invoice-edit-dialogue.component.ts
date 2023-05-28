import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output,HostListener } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PsDialogComponent} from 'src/app/ps-dialog/ps-dialog.component';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {FloatLabelType} from '@angular/material/form-field';
import { delay } from 'rxjs';
import { Table } from 'primeng/table';
import {OrderDataService} from '../services/order-data.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {AnnulationInvoiceDialogComponent} from 'src/app/annulation-invoice-dialog/annulation-invoice-dialog.component';
import{EditDialogComponent} from 'src/app/edit-dialog/edit-dialog.component';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { type } from 'os';
import { ExtraFeesComponent } from '../extra-fees/extra-fees.component';

export interface Ordre
{
  idOrder:number,
  quantity:number,
  orderNum:string,
  clientId:string
}
@Component({
  selector: 'app-invoice-edit-dialogue',
  templateUrl: './invoice-edit-dialogue.component.html',
  styleUrls: ['./invoice-edit-dialogue.component.css']
})
export class InvoiceEditDialogueComponent implements OnInit {

  useClientPartNumberINVOICESelected = this.editData.useClientPartNumberINVOICE
  test:boolean= true;
  favoriteSeason: any;
  invoiceForm !: FormGroup;
  btnAction :string ="save";
  hello:string="All checked"
  @Output() reloadTable = new EventEmitter();
  selection = new SelectionModel<Ordre>(true, []);
  myForm: any;
  data:any;
  comp:number=0;
  setterInvoice: any;
  psCall: any = [];
  displayedColumns: string[] = ['psId','quantity', 'creationDate','ActionsO'];
  invoiceLines:any;
  row:any
  @Output() orders: EventEmitter<any> = new EventEmitter();
  @HostListener('selectionOrders()')
  selectionOrders(){
         // this.ordres=this.selection.selected;
        this.orders.emit(this.selection.selected);
  }
  @Output() onSelected = new EventEmitter<any>();
   displayedColumns11: string[] = ['customerPoNumber', 'dsNumbers','isbn10','oemPo','title','qty','unitPrice','surcharge','ActionsO'];

  constructor(private formbuilder:FormBuilder,
  private http: HttpClient,private orderData: OrderDataService,
  @Inject(MAT_DIALOG_DATA) public editData:any,private _formBuilder: FormBuilder,public dialog1: MatDialog,public dialog: MatDialog,
  private dialioRef:MatDialogRef<InvoiceEditDialogueComponent>) {
    console.warn(editData)
 }

      res:any=[];
      types:any=[]
   ngOnInit(): void {
    const form=this.formbuilder.group({

    })
      this.invoiceForm=this.formbuilder.group(
        {

          qty:['',Validators.required],
          unitPrice:['',Validators.required],
          surcharge:['',Validators.required],
          productionPage: [ '', Validators.required ],
          transportCost:[''],


        }  )
     if ( this.editData )
        { this.btnAction="Update"
        this.trait()
          this.invoiceForm.controls['qty'].setValue(this.editData.invoiceLines[0].qty)
          this.invoiceForm.controls['unitPrice'].setValue(this.editData.invoiceLines[0].unitPrice)
          this.invoiceForm.controls['surcharge'].setValue(this.editData.invoiceLines[0].surcharge)
          this.invoiceForm.controls[ 'productionPage' ].setValue( this.editData.invoiceLines[ 0 ].productionPage )
        }
        
    }
    updateInvoice(){
      const result =  this.editData.invoiceLines.filter((a:any) => a.type!=='extra');
 
      if(this.types.length>0) {
        this.types.forEach((element: any) => {
          element[ 'idOrder' ] = this.editData.invoiceLines[ 0 ].idOrder
          element[ 'surcharge' ] = this.editData.invoiceLines[ 0 ].surcharge
          element['type']='extra'
          result.push( element )
        });
      }
      this.editData.invoiceLines=result
      this.setterInvoice = Object.assign(this.editData)
     // this.setterInvoice.idInvoice = this.editData.idInvoice
      // this.setterInvoice.invoiceLines[0].unitPrice=this.invoiceForm.value.unitPrice
      // this.setterInvoice.invoiceLines[0].qty=this.invoiceForm.value.qty
      // this.setterInvoice.invoiceLines[1].qty=this.invoiceForm.value.qty
      // this.setterInvoice.invoiceLines[0].surcharge=this.invoiceForm.value.surcharge
      // this.setterInvoice.invoiceLines[0].productionPage=this.invoiceForm.value.productionPage
      return this.setterInvoice;
    }
    addInvoice(data:any)
    {
      this.orderData.editInvoice(data).subscribe((tt)=>{
        this.data=tt;
      });
    }
    viewAnnulationInvoice() {
      this.updateInvoice()
         this.orderData.annulationInvoice(this.setterInvoice).subscribe((tt)=>{
                  this.data=tt;
                   let row1=this.data;
                     this.dialog.open(AnnulationInvoiceDialogComponent , { width: '75%' , data:this.data}).afterClosed().subscribe((res) => {
              });
           });
        

  }
Close(){}

check(isbn:String)
{
if(isbn.length>14){this.test=false;}
}
EditRow(row: any)
      
      {
        this.dialog.open(EditDialogComponent,
          {
            width: '50%',
            height:'fit-content',
            data:this.editData.invoiceLines
          }).afterClosed().subscribe(()=>{
            var length=this.editData.invoiceLines.indexOf(row)
            if(this.editData.invoiceLines[length+1].diffLine === true){
              this.editData.invoiceLines[length+1].qty=row.qty
              this.editData.invoiceLines[length+1].surcharge=row.surcharge
            }

          });

      }
      trait(){
        this.editData.invoiceLines.forEach((element: any) => {
          if(element.type==='extra')
          {
            let Object={
              name: element.name,
              value:element.value
            }
            this.types.push(Object)
            console.warn(Object)
          }
          return this.types
      })}
      editExtraFees(){

          this.dialog.open(ExtraFeesComponent,
            {
              width: '50%',
              height:'fit-content',
              data:this.types 
            }).afterClosed().subscribe((res: any)=>
            {
              this.types = res
              this.updateInvoice()
          }
           ) 
        }
      

saveRow(row:any){}
}