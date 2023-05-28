import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDialog1Component } from './invoice-dialog1.component';

describe('InvoiceDialog1Component', () => {
  let component: InvoiceDialog1Component;
  let fixture: ComponentFixture<InvoiceDialog1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceDialog1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDialog1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
