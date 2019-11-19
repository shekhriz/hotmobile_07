import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,PopoverController,ViewController} from 'ionic-angular';
import { CandidatesearchComponent }  from '../../components/candidatesearch/candidatesearch';
import { CandidateSearchPage }  from '../../pages/candidate-search/candidate-search';

/**
 * Generated class for the SearchViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-view',
  templateUrl: 'search-view.html',
})
export class SearchViewPage {
  candidates:any;
  selected:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public viewCtrl : ViewController,

     ) {
    this.candidates=navParams.get('Details'); 
    this.selected=navParams.get('jsonData'); 
      console.log('selected',this.selected)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchViewPage');
  }
  presentPopover(myEvent,candidate){
    let popover = this.popoverCtrl.create(CandidatesearchComponent,{candidate});
    popover.present({
     ev: myEvent  
    });
  console.log('popover',popover);
  }
  editSearch(){
    this.viewCtrl.dismiss(CandidateSearchPage);
  }
  backToSearch(){
    this.navCtrl.pop();

  }
  goBack(){
    this.viewCtrl.dismiss();
 }
}
