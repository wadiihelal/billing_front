import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnulationInvoiceDialogComponent } from './annulation-invoice-dialog.component';

describe('AnnulationInvoiceDialogComponent', () => {
  let component: AnnulationInvoiceDialogComponent;
  let fixture: ComponentFixture<AnnulationInvoiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnulationInvoiceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnulationInvoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
