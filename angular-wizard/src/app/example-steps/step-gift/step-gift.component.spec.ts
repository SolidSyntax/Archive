import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepGiftComponent } from './step-gift.component';

describe('StepGiftComponent', () => {
  let component: StepGiftComponent;
  let fixture: ComponentFixture<StepGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
