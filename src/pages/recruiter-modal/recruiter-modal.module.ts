import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecruiterModalPage } from './recruiter-modal';

@NgModule({
  declarations: [
    RecruiterModalPage,
  ],
  imports: [
    IonicPageModule.forChild(RecruiterModalPage),
  ],
})
export class RecruiterModalPageModule {}
