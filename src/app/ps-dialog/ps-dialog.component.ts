import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output,HostListener } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {FloatLabelType} from '@angular/material/form-field';
import { delay } from 'rxjs';
import {OrderDataService} from '../services/order-data.service';
export interface Ordre
{
  [x: string]: any;
  idOrder:number,
  quantity:number,
  orderNum:string,
  clientId:string
}
@Component({
  selector: 'app-ps-dialog',
  templateUrl: './ps-dialog.component.html',
  styleUrls: ['./ps-dialog.component.css']
})
export class PsDialogComponent implements OnInit {
btnAction :string ="add";
  psCall: any = [];
  psList: any = [];
  @Output() reloadTable = new EventEmitter();
   selection = new SelectionModel<Ordre>(true, []);

  myForm: any;
    setterOrder: any;

  row:any
    @Output() orders: EventEmitter<any> = new EventEmitter();
      @HostListener('selectionOrders()')
        selectionOrders(){
         // this.ordres=this.selection.selected;
        this.orders.emit(this.selection.selected);
        console.log(this.selection.selected);
        console.log(this.orders.emit);
        }
   displayedColumns: string[] = ['psId','quantity', 'creationDate','realWeight','ActionsO'];
    constructor(private formbuilder:FormBuilder,
      private http: HttpClient,private orderData : OrderDataService,
      @Inject(MAT_DIALOG_DATA) public editData:any,private _formBuilder: FormBuilder,public dialog: MatDialog,
      private dialioRef:MatDialogRef<PsDialogComponent>) {
      orderData.psCall().subscribe((tt)=>{
      this.psCall=tt; });
      }
  ngOnInit(): void {  }
 addps(row:any){
     console.log("row",row);
     this.psList.push(row);
 }
 addpsToOrder(ps:any){
    console.log("editData",this.editData);
     this.orderData.addPsToOrder(ps,this.editData.idOrder).subscribe((tt)=>{
     this.editData.packingSlips=tt;
     console.log("editData1",this.editData);
    });
 }
}