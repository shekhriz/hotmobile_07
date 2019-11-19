import { Component } from '@angular/core';
import {App,IonicPage,AlertController,ViewController, NavController, NavParams,LoadingController,PopoverController,ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { CandidateHisModalPage }  from '../../pages/candidate-his-modal/candidate-his-modal';

/**
 * Generated class for the CandidatesearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'candidatesearch',
  templateUrl: 'candidatesearch.html'
})
export class CandidatesearchComponent {

  text: string;
  candidate:any;
  canId:string;
  constructor(
    public modalCtrl:ModalController,
    public appCtrl: App,
    public navParams: NavParams,
    public viewCtrl : ViewController,

  ) {
    console.log('Hello CandidatesearchComponent Component');
    this.text = 'Hello World';
    this.candidate = navParams.get('candidate');
    this.canId = this.candidate.candidateId;

  }
  historyCandidate(){
    this.appCtrl.getRootNav().push(CandidateHisModalPage,{canId:this.canId});
    this.viewCtrl.dismiss();
  }
}
