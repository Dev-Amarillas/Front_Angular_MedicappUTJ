import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVideos } from './form-videos';

describe('FormVideos', () => {
  let component: FormVideos;
  let fixture: ComponentFixture<FormVideos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormVideos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormVideos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
