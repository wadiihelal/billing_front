import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportClientComponent } from './export-client.component';

describe('ExportClientComponent', () => {
  let component: ExportClientComponent;
  let fixture: ComponentFixture<ExportClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
