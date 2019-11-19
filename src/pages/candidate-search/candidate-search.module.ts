import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CandidateSearchPage } from './candidate-search';

@NgModule({
  declarations: [
    CandidateSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(CandidateSearchPage),
  ],
})
export class CandidateSearchPageModule {}
