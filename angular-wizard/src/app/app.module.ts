import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { WizardComponent } from './wizard/wizard.component';
import { StepNameComponent } from './example-steps/step-name/step-name.component';
import { StepAgeComponent } from './example-steps/step-age/step-age.component';
import { StepGiftComponent } from './example-steps/step-gift/step-gift.component';


@NgModule({
  declarations: [
    AppComponent,
    WizardComponent,
    StepNameComponent,
    StepAgeComponent,
    StepGiftComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
