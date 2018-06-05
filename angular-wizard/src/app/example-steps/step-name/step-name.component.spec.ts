import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepNameComponent } from './step-name.component';

describe('StepNameComponent', () => {
  let component: StepNameComponent;
  let fixture: ComponentFixture<StepNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
