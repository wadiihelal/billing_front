import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import jspdf from 'jspdf';
import {MenuItem} from 'primeng/api';
import html2canvas from 'html2canvas';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {OrderDataService} from '../services/order-data.service';
@Component({
  selector: 'app-invoice-dialog-test',
  templateUrl: './invoice-dialog-test.component.html',
  styleUrls: ['./invoice-dialog-test.component.css']
})
export class InvoiceDialogTestComponent implements OnInit {
pdfLoading:boolean= false;
pdfLoading2:boolean= false;
invoiceLines: any;
invoicesLines: any;
invoicesCall:any=[];
constructor( @Inject(MAT_DIALOG_DATA) public row:any,private dialioRef:MatDialogRef<InvoiceDialogTestComponent >,private orderData : OrderDataService) {  console.log("invoiceDialogue",row); }
  ngOnInit(): void {
  }

 cancel(){
  }
  save(row:any){
  this.orderData.saveinvoiceTest(row).subscribe((tt)=>{
   this.orderData.invoicesCall().subscribe((tt)=>{  this.invoicesCall=tt;   });
    });
  }
}
