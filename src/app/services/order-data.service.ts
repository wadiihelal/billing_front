import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Ordre } from "../ps-dialog/ps-dialog.component";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class OrderDataService {
  users: any;
  pacexApi: any;
  billingAPi: any;

  constructor(private http: HttpClient) {
    //this.pacexApi = environment.pacexApi;
    this.billingAPi = environment.billingApi;
  }
  ordersCall() {
    const a = this.http.get(`${this.billingAPi}/OrdersForBilling`);
    return a;
  }
  archiveCall() {
    return this.http.get(`${this.billingAPi}/ArchivedOrdres`);
  }
  psCall() {
    const a = this.http.get(`${this.billingAPi}/AllPs`);
    return a;
  }
  updateOrder(data: any) {
    return this.http.post(`${this.billingAPi}/addOrder`, data);
  }
  addPsToOrder(data: any, id: any) {
    return this.http.post(`${this.billingAPi}/AffectPsToOrder/${id}`, data);
  }
  deletePsFromOrder(idps: any, id: any) {
    return this.http.delete(
      `${this.billingAPi}/deletePsFromOrder/${idps}/${id}`
    );
  }

  createinvoice(data: any) {
    return this.http.post(`${this.billingAPi}/createInvoiceEnMasse`, data);
  }
  createinvoiceTest(data: any) {
    return this.http.post(`${this.billingAPi}/createInvoiceTest`, data);
  }
  saveinvoiceTest(data: any) {
    return this.http.post(`${this.billingAPi}/saveInvoice`, data);
  }
  invoicesCall() {
    return this.http.get(`${this.billingAPi}/allInvoices`);
  }
  invoicesProformaCall(): Observable<Ordre> {
    return this.http.get<Ordre>(`${this.billingAPi}/allProforma`);
  }
  PsByOrder(idOrder: any) {
    return this.http.get(`${this.billingAPi}/psByOrder/${idOrder}`);
  }
  ConfirmProforma(row: any) {
    return this.http.post(`${this.billingAPi}/validateInvoice/`, row);
  }
  deleteProforma(idInvoice: any) {
    return this.http.delete(`${this.billingAPi}/deleteProforma/${idInvoice}`);
  }
  exportInvoices(idList: any) {
    return this.http.post(`${this.billingAPi}/exportInvoices`, idList);
  }

  editInvoice(row: any) {
    return this.http.post(`${this.billingAPi}/editInvoice`, row);
  }
  annulationInvoice(row: any) {
    return this.http.post(`${this.billingAPi}/annulationInvoice`, row);
  }
  saveAnnulationInvoice(row: any) {
    return this.http.post(`${this.billingAPi}/saveAnnulationInvoice`, row);
  }
  getProforma(id: any): Observable<any> {
    return this.http.get(`${this.billingAPi}/proforma/${id}`);
  }
  getPsbyProdPartId(prodPartId: any) {
    return this.http.get(
      `${this.pacexApi}:7777/SHIPPINGSTATION/packingslipsByproductionPartId/${prodPartId}`
    );
  }
  getOrderForEdit(order: any) {
    return this.http.post(`${this.billingAPi}/CheckOrderForUpdates`, order);
  }
}
