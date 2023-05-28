
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import jspdf from 'jspdf';
import {MenuItem} from 'primeng/api';
import html2canvas from 'html2canvas';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxBarcodeModule } from 'ngx-barcode';
import {OrderDataService} from '../services/order-data.service';
@Component({
  selector: 'app-invoice-dialog',
  templateUrl: './invoice-dialog.component.html',
  styleUrls: ['./invoice-dialog.component.css']
})
export class InvoiceDialogComponent implements OnInit {
pdfLoading:boolean= false;
pdfLoading2:boolean= false;
invoiceLines: any;
data = document.getElementById('contentToPrint');
psList:any[]=[]
psListCount:any[]=[]
invoicesLines: any;
constructor( @Inject(MAT_DIALOG_DATA) public row:any,private orderData: OrderDataService) {  }
  ngOnInit(): void {
    console.log(this.row,'eni')
    console.warn(this.row.invoiceLines[0].psIds.length,"id")
    this.psList=this.row.invoiceLines[0].psIds

  }
  downloadPDF(){
     this.pdfLoading2 = true;
     window.scrollTo(0, 0);
     setTimeout(() => {
     this.data = document.getElementById('contentToPrint');
     html2canvas(this.data!).then(canvas => {
       var imgWidth = 208;
       var imgHeight = canvas.height * imgWidth / canvas.width;
       let txt1;
      // const txt1=`EPAC Technologies · Calle Septima 300 Ste 1000 · Apodaca NL. CP 66603 MX. ${this.row.total}`
      if (this.row.accountName == 'Savvas Learning Company')
      {
       txt1= 'Terms: Net 45 - No Discount Allowed - Service charge of 1.5% per month may be charged after 45 days'
      }
      else {  txt1= 'Terms: Net 45 - No Discount Allowed - Service charge of 1.5% per month may be charged after 30 days' }
      const txt2 =`Please Remit To: EPAC Technologies, Inc. • 2561 Grant Ave. • San Leandro, CA 94579`
      var time = new Date (this.row.invoiceDate)
      const timeFooter = `${time.getMonth()+1}/${time.getDate()}/${time.getFullYear()} at ${time.getHours()}:${time.getUTCMinutes()} `
       const contentDataURL = canvas.toDataURL('image/png');
       let pdf = new jspdf('p', 'mm', [215.9,279.4]);
       var position = 0;
       pdf.setFontSize(8)
          pdf.text(txt1, 215.9 / 2 - (pdf.getTextWidth(txt1) / 2), 279.4 - 15); 
          pdf.text(txt2, 235.9 / 2 - (pdf.getTextWidth(txt1) / 2), 279.4 - 10);
          pdf.text(timeFooter, 20 - (pdf.getTextWidth(timeFooter) / 2), 279.4 - 5);
       pdf.addImage(contentDataURL, 'PNG', 5 , position, imgWidth, imgHeight,'Invoice','FAST');
        
       let title=`EPAC Invoice # E`+this.row.idInvoice+`.pdf`
       pdf.save(title);
     });
     this.pdfLoading2 = false;

   }, 700);
  }
 cancel(){
  
 }
 save(){
 this.orderData.saveAnnulationInvoice(this.row).subscribe((tt)=>{
       });
    }

}