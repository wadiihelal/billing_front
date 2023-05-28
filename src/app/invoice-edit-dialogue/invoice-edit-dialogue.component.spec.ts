import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceEditDialogueComponent } from './invoice-edit-dialogue.component';

describe('InvoiceEditDialogueComponent', () => {
  let component: InvoiceEditDialogueComponent;
  let fixture: ComponentFixture<InvoiceEditDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceEditDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceEditDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
