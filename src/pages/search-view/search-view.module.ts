import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchViewPage } from './search-view';

@NgModule({
  declarations: [
    SearchViewPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchViewPage),
  ],
})
export class SearchViewPageModule {}
