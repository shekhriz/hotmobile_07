import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TechnicalModalPage } from './technical-modal';

@NgModule({
  declarations: [
    TechnicalModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TechnicalModalPage),
  ],
})
export class TechnicalModalPageModule {}
