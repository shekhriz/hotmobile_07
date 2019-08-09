import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the AccMgrModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-acc-mgr-modal',
  templateUrl: 'acc-mgr-modal.html',
})
export class AccMgrModalPage {
  userid:string;
  token:string;
  id:string;
  userDetails:any={};
  contact:string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider,
    public util: UtilsProvider,
    public viewCtrl : ViewController) {
    this.userid = navParams.get('userid');
    this.contact = navParams.get('contact');
    this.token = this.util.getToken();
   // console.log('this.contactId ', this.contactId );
    this.editUsers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactmodalPage');
  }
  editUsers(){
     this.restProvider.editUsers(this.userid,this.token)
    .then((data:any)=>{
       this.userDetails =data;
    console.log("userDetails",this.userDetails);
    },errrr=>{
      //console.log(errrr);
    });
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }
  cancelData(){
    this.viewCtrl.dismiss();
  }
 
}
