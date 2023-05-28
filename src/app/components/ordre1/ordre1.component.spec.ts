import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ordre1Component } from './ordre1.component';

describe('Ordre1Component', () => {
  let component: Ordre1Component;
  let fixture: ComponentFixture<Ordre1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ordre1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ordre1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
