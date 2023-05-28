import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
//import { MatCarouselModule } from '@ngmodule/material-carousel';
import {MatGridListModule} from '@angular/material/grid-list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatListModule} from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MessageModule} from 'primeng/message';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {CarouselModule} from 'primeng/carousel';
import {MenubarModule} from 'primeng/menubar';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Ordre1Component } from './components/ordre1/ordre1.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { InvoiceDialogComponent } from './invoice-dialog/invoice-dialog.component';
import { PsDialogComponent } from './ps-dialog/ps-dialog.component';
import { InvoiceDialog1Component } from './invoice-dialog1/invoice-dialog1.component';
import { InvoiceDialogTestComponent } from './invoice-dialog-test/invoice-dialog-test.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ProformaComponent } from './proforma/proforma.component';
import { DateInvoiceComponent } from './date-invoice/date-invoice.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { InvoiceEditDialogueComponent } from './invoice-edit-dialogue/invoice-edit-dialogue.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { ReportsComponent } from './reports/reports.component';
import { ArchiveComponent } from './archive/archive.component';
import { Chart } from 'chart.js';
import { AnnulationInvoiceDialogComponent } from './annulation-invoice-dialog/annulation-invoice-dialog.component';
import { ExportClientComponent } from './export-client/export-client.component';
import { ExtraFeesComponent } from './extra-fees/extra-fees.component';
import { TableModule } from 'primeng/table';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import * as FileSaver from 'file-saver';
function initializeKeycloak (keycloak: KeycloakService) {
  console.log('Initilazing the security...');
  console.log('Api: ', environment.billingApi);
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloak.issuer,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId
      },
      loadUserProfileAtStartUp: true,
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: true,
      },
      bearerExcludedUrls: []
    });
}


@NgModule({
  declarations: [

    AppComponent,
    Ordre1Component,
    InvoiceComponent,
    OrderDialogComponent,
    InvoiceDialogComponent,
    PsDialogComponent,
    InvoiceDialog1Component,
    InvoiceDialogTestComponent,
    ProformaComponent,
    DateInvoiceComponent,
    InvoiceEditDialogueComponent,
    EditDialogComponent,
    ReportsComponent,
    ArchiveComponent,
    AnnulationInvoiceDialogComponent,
    ExportClientComponent,
    ExtraFeesComponent
  ],
  imports: [
    MatMenuModule,
    TableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    NgxBarcodeModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    ScrollingModule,
    MatCheckboxModule,
    DragDropModule,
    MatListModule,
    MatSidenavModule,
    MatMenuModule,
    MatCardModule,
    CarouselModule,
    MatProgressBarModule,
    ButtonModule,
    ToastModule,
    MessageModule,
    ConfirmDialogModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    MenubarModule,
    KeycloakAngularModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],

    },

    MessageService,
    ConfirmationService,
    {provide : LocationStrategy , useClass: HashLocationStrategy}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
