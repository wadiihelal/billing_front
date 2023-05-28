import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDialogTestComponent } from './invoice-dialog-test.component';

describe('InvoiceDialogTestComponent', () => {
  let component: InvoiceDialogTestComponent;
  let fixture: ComponentFixture<InvoiceDialogTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceDialogTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDialogTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
