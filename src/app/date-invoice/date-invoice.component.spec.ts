import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateInvoiceComponent } from './date-invoice.component';

describe('DateInvoiceComponent', () => {
  let component: DateInvoiceComponent;
  let fixture: ComponentFixture<DateInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
