import {AfterContentInit, AfterViewInit, Component, ContentChildren, OnInit, QueryList, ViewChildren} from '@angular/core';
import {checkBindingNoChanges} from '@angular/core/src/view/util';
import {StepNameComponent} from '../example-steps/step-name/step-name.component';
import {WizardStep} from './WizardStep';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit, AfterViewInit, AfterContentInit {

  @ViewChildren('div') viewChildren: QueryList<any>;
  @ContentChildren('WizardStep') contentChildren: QueryList<WizardStep>;


  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    console.log('After Content Init');
    this.display();
  }


  ngAfterViewInit(): void {
    console.log('After View Init');
    this.display();
  }


  display() {
    this.viewChildren.forEach(child => console.log(child));
    this.viewChildren.changes.subscribe(c => {
      console.log('viewChildren Changes');
      c.toArray().forEach(item => {
        console.log(item);
      });
    });

    this.contentChildren.forEach(child => console.log(child));
    this.contentChildren.changes.subscribe(c => {
      console.log('contentChildren Changes');
      c.toArray().forEach(item => {
        console.log(item);
      });
    });
  }

}
