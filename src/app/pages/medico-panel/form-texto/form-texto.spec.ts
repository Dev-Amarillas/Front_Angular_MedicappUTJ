import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTexto } from './form-texto';

describe('FormTexto', () => {
  let component: FormTexto;
  let fixture: ComponentFixture<FormTexto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTexto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTexto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
