import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormImagenes } from './form-imagenes';

describe('FormImagenes', () => {
  let component: FormImagenes;
  let fixture: ComponentFixture<FormImagenes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormImagenes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormImagenes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
