import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Ordre1Component } from "./components/ordre1/ordre1.component";
import { InvoiceComponent } from "./components/invoice/invoice.component";
import { ProformaComponent } from "src/app/proforma/proforma.component";
import { ReportsComponent } from "src/app/reports/reports.component";
import { ArchiveComponent } from "./archive/archive.component";

const routes: Routes = [
  { path: "", component: Ordre1Component },
  { path: "invoices", component: InvoiceComponent },
  { path: "proforma", component: ProformaComponent },
  { path: "reports", component: ReportsComponent },
  { path: "archive", component: ArchiveComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
