import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-extra-fees',
  templateUrl: './extra-fees.component.html',
  styleUrls: ['./extra-fees.component.css']
})
export class ExtraFeesComponent implements OnInit {
  invoiceLineForm!: FormGroup;
  setterRow: any;

  
  constructor( @Inject(MAT_DIALOG_DATA) public row:any,private formbuilder: FormBuilder,private dialogRef: MatDialogRef<EditDialogComponent>) {
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
  ngOnInit(): void {

     this.invoiceLineForm=this.formbuilder.group(
       {
      
         fees: this.formbuilder.array([
           this.formbuilder.control('')
         ]),
         types: this.formbuilder.array([
           this.formbuilder.control('')
         ])
          }  )
             if(this.row)
     { 

      }
           var valuesToSubmit:any=[]
          var typesToSubmit:any=[]
          this.row.forEach((element: any) => {
            valuesToSubmit.push(element.value)
            typesToSubmit.push(element.name)
            this.fees.push(this.formbuilder.control(''))
            this.types.push(this.formbuilder.control(''))
            
          });
          this.fees.controls.shift()
          this.types.controls.shift()
        this.invoiceLineForm.controls['fees'].setValue(valuesToSubmit)
        this.invoiceLineForm.controls['types'].setValue(typesToSubmit)
  }

         saveRow(){
          var result: any[] = [];
          for(let i=0;i<this.fees.value.length;i++){

            result.push({type:'extra',isbn:this.types.value[i].toString(),isbn10:this.types.value[i].toString(),name:this.types.value[i].toString(),value:this.fees.value[i],total:this.fees.value[i]})
          }
          
          this.dialogRef.close(result)

          // this.setterRow.transportCost=this.invoiceLineForm.value.transportCost
          }
      checked: boolean = false;
      
      toggle(e: any) {
        e.checked? this.checked = true: this.checked = false; 
      
      }}
    
    