import { Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormArray, FormControl} from '@angular/forms';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
invoiceLineForm!: FormGroup;
setterRow: any;
constructor( @Inject(MAT_DIALOG_DATA) public row:any,private formbuilder: FormBuilder) {
 }
addFees() {
  this.fees.push(this.formbuilder.control(''))
  this.types.push(this.formbuilder.control(''))
}
removeFees(index: number){
this.fees.removeAt(index)
this.types.removeAt(index)
}
get fees() {
return this.invoiceLineForm.get('fees') as FormArray
}
get types() {
return this.invoiceLineForm.get('types') as FormArray
}
ngOnInit(): void 
{   
   this.invoiceLineForm=this.formbuilder.group(
                        {
                          qty:['',Validators.required],
                          unitPrice:['',Validators.required],
                          surcharge:['',Validators.required],
                          productionPage:['',Validators.required],
                          transportCost:[''],
                          fees: this.formbuilder.array([
                            this.formbuilder.control('')
                          ]),
                          types: this.formbuilder.array([
                            this.formbuilder.control('')
                          ])
                           }  )
   
if(this.row[0].qty==undefined){ this.row[0].qty=0}
      if(this.row)
         {
           this.invoiceLineForm.controls['qty'].setValue(this.row[0].qty)
           this.invoiceLineForm.controls['unitPrice'].setValue(this.row[0].unitPrice)
           this.invoiceLineForm.controls['surcharge'].setValue(this.row[0].surcharge)
           this.invoiceLineForm.controls[ 'productionPage' ].setValue( this.row[0].productionPage )
           this.row[length-1].fees=this.invoiceLineForm.get(['fees'])?.value
           this.row[length-1].types=this.invoiceLineForm.get(['types'])?.value


         }
         console.log(this.invoiceLineForm)
         var valuesToSubmit:any=[]
         var typesToSubmit:any=[]
         if(this.invoiceLineForm.value.type==='extra')
         {
           this.checked=true
           for(let i =0;i<this.invoiceLineForm.value.totalCost.length;i++) {
             var value = this.invoiceLineForm.value.totalCost[i]
             valuesToSubmit.push(value.value)
             typesToSubmit.push(value.type)
             this.fees.push(this.formbuilder.control(''))
             this.types.push(this.formbuilder.control(''))
           }
             this.fees.controls.shift()
             this.types.controls.shift()
           this.invoiceLineForm.controls['fees'].setValue(valuesToSubmit)
           this.invoiceLineForm.controls['types'].setValue(typesToSubmit)
   

         

                           }}
                           
saveRow(row:any){
  console.log( this.row,'hello' )

    this.setterRow = Object.assign(row)
    
    this.setterRow[0].qty= this.invoiceLineForm.value.qty
    this.setterRow[0].unitPrice=this.invoiceLineForm.value.unitPrice
    this.setterRow[0].surcharge=this.invoiceLineForm.value.surcharge
    this.setterRow[0].productionPage=this.invoiceLineForm.value.productionPage
    this.setterRow[0].transportCost=this.invoiceLineForm.value.transportCost
}
checked: boolean = false;
toggle(e: any) {
  e.checked? this.checked = true: this.checked = false; 

}
}