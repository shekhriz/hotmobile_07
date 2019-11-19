import { Component } from '@angular/core';
import {App,IonicPage,AlertController,ViewController, NavController, NavParams,LoadingController,PopoverController,ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';

import { CandidateHisModalPage }  from '../../pages/candidate-his-modal/candidate-his-modal';

/**
 * Generated class for the ClientPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'client-popover',
  templateUrl: 'client-popover.html'
})
export class ClientPopoverComponent {

  text: string;
  token:string;
  CId:string;
  clientName:string;
  isBlackListed:string;
  result:any;
  loginUser:string;
  enabled:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider:RestProvider,
    public util: UtilsProvider,
    public loadingCtrl:LoadingController,
    public popoverCtrl: PopoverController ,
    public alertCtrl: AlertController,
    public appCtrl: App,
    public viewCtrl : ViewController){
      this.token = this.util.getToken();
      this.CId = navParams.get('id');
      console.log('enabled',this.enabled);
    }
    historyCandidate(){
      //this.appCtrl.getRootNav().push(CandidateHisModalPage,{canId:this.canId});
      this.viewCtrl.dismiss();
  
    }
}
