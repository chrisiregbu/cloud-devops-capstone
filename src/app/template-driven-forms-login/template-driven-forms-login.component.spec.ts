import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDrivenFormsLoginComponent } from './template-driven-forms-login.component';

describe('TemplateDrivenFormsLoginComponent', () => {
  let component: TemplateDrivenFormsLoginComponent;
  let fixture: ComponentFixture<TemplateDrivenFormsLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateDrivenFormsLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateDrivenFormsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
