import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams,LoadingController,PopoverController,ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { RequirementPopoverComponent } from '../../components/requirement-popover/requirement-popover';
import { AddrequirementPage }  from '../../pages/addrequirement/addrequirement';
import { EditrequirementsPage }  from '../../pages/editrequirements/editrequirements';
import { HomePage } from '../home/home';

/**
 * Generated class for the RequirementsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-requirements',
  templateUrl: 'requirements.html',
})
export class RequirementsPage {
token:string;
requirements:any;
loginUser:any = {};


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider:RestProvider,
    public util: UtilsProvider,
    public loadingCtrl:LoadingController,
    public popoverCtrl: PopoverController ) {
      let token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();
      this.getRequirement( token,this.loginUser);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RequirementsPage');
  }
  getRequirement(token,user){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.getRequirements(token,user)
    .then( res=> {
      this.requirements = res;
      
      loading.dismiss();
     
    },error => {
      loading.dismiss();
    });
  }

  // presentPopover(myEvent,requirement){
  //   let popover = this.popoverCtrl.create(RequirementPopoverComponent,{reqId:requirement.positionId,
  //     workflowId:requirement.workflowId,actMgrId:requirement.actMgrId});
  //   popover.present({
  //    ev: myEvent  
     
  //   });
  //   console.log( "workflowId",requirement.workflowId);
  

  // }
  presentPopover(myEvent,requirement){
    let popover = this.popoverCtrl.create(RequirementPopoverComponent,requirement);
    popover.present({
     ev: myEvent  
     
    });
    console.log( "workflowId",requirement);
  

  }
  gotoEditRequirement(client){
    this.navCtrl.push(EditrequirementsPage,{clientId:client.positionId,clientName:client.clientName})
    console.log("positionId",client);
  }
  createRequirement(){
    this.navCtrl.push(AddrequirementPage)
   // console.log("id",clientId);
  }
  goBack(){
    this.navCtrl.push(HomePage)
  }
}
