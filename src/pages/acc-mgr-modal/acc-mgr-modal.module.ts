import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccMgrModalPage } from './acc-mgr-modal';

@NgModule({
  declarations: [
    AccMgrModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AccMgrModalPage),
  ],
})
export class AccMgrModalPageModule {}
