import { Component, OnInit } from '@angular/core';
import {WizardStep} from '../../wizard/WizardStep';

@Component({
  selector: 'app-step-name',
  templateUrl: './step-name.component.html',
  styleUrls: ['./step-name.component.css']
})
export class StepNameComponent implements OnInit, WizardStep {

  constructor() { }

  ngOnInit() {
  }

  id(): String {
    return 'name-step';
  }

}
