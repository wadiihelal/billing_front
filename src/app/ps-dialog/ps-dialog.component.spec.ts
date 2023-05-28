import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsDialogComponent } from './ps-dialog.component';

describe('PsDialogComponent', () => {
  let component: PsDialogComponent;
  let fixture: ComponentFixture<PsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
