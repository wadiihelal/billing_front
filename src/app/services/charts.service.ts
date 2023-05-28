import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  billingAPi:any;
  constructor(private http:HttpClient) {
    this.billingAPi = environment.billingApi;
   }
  // getOrdersByClient(){
  //   return this.http.get(`http://localhost:1200/NbOrdresByClient`)  
  // }
  getInvoicesByClient(){
    return this.http.get(`${this.billingAPi}/NbInvoicesByClient`)  
  }
}
