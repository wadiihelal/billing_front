import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraFeesComponent } from './extra-fees.component';

describe('ExtraFeesComponent', () => {
  let component: ExtraFeesComponent;
  let fixture: ComponentFixture<ExtraFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraFeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
