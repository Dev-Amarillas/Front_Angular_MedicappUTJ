import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoresComponent } from './tutores';

describe('Tutores', () => {
  let component: TutoresComponent;
  let fixture: ComponentFixture<TutoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutoresComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
