import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepAgeComponent } from './step-age.component';

describe('StepAgeComponent', () => {
  let component: StepAgeComponent;
  let fixture: ComponentFixture<StepAgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepAgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
