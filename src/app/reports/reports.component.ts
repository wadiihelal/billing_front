import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {ChartsService} from '../services/charts.service';
import { DateInvoiceComponent } from 'src/app/date-invoice/date-invoice.component';
 import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ArchiveComponent } from '../archive/archive.component';
import {MatMenuModule} from '@angular/material/menu';
import { ExportClientComponent } from '../export-client/export-client.component';

Chart.register(...registerables);
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

   cc : any
    result: any=[];
  constructor(public dialog: MatDialog,private getChart:ChartsService) { 
   
     this.cc = [12, 19, 3, 5, 2, 3]

  }
 clients :any
 nbOrders:any[]=[]
 customers:any[]=[]
 spinner:boolean=true;
 nbInvoices:any[]=[]
  ngOnInit(): void {
    console.log(this.spinner)
    // this.getChart.getOrdersByClient().subscribe((res: any)=>{  
    //     this.clients = Object.keys(res)
    //     this.nbOrders = Object.values(res)
    //     this.renderPieChart()
    //     this.spinner=false

    //   });
    this.getChart.getInvoicesByClient().subscribe((data:any)=>{
      this.spinner=true
      this.nbOrders=data
        this.nbOrders.forEach((element: any) => {
          this.customers.push(element.client)
          this.nbInvoices.push(element.nb)
          
        });
        console.log(this.customers)

        this.renderBarChart()

    })

  }
  renderBarChart (){
    var myChart = new Chart("barchart", {
      type: 'pie',
      data: {
          labels: this.customers,
          datasets: [{
              label: '# of Invoices',
              data:this.nbInvoices,
              backgroundColor: [
                  'rgba(255, 199, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
     
      })
  }
  // renderPieChart (){
  //   var myChart = new Chart("piechart", {
  //     type: 'bar',
  //     data: {
  //         labels:this.clients,
  //         datasets: [{
  //             label: '# of Orders',
  //             data: this.nbOrders,
  //             backgroundColor: [
  //                 'rgba(255, 99, 132, 0.2)',
  //                 'rgba(54, 162, 235, 0.2)',
  //                 'rgba(255, 206, 86, 0.2)',
  //                 'rgba(75, 192, 192, 0.2)',
  //                 'rgba(153, 102, 255, 0.2)',
  //                 'rgba(255, 159, 64, 0.2)'
  //             ],
  //             borderColor: [
  //                 'rgba(255, 99, 132, 1)',
  //                 'rgba(54, 162, 235, 1)',
  //                 'rgba(255, 206, 86, 1)',
  //                 'rgba(75, 192, 192, 1)',
  //                 'rgba(153, 102, 255, 1)',
  //                 'rgba(255, 159, 64, 1)'
  //             ],
  //             borderWidth: 1
  //         }]
  //     },
  //     options: {
  //       scales: {
  //           y: {
  //               beginAtZero: true
  //           }
  //       }
  //   }

  //     })
  // }
  
  exportTableau() {
    this.dialog.open(DateInvoiceComponent , { width: 'auto', height:'auto' }).afterClosed().subscribe((result: any) => {});

}
exportInvoicesClient() {
    this.dialog.open(ExportClientComponent , { width: 'auto', height:'auto' }).afterClosed().subscribe((result: any) => {});

}

}

