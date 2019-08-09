import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ViewController,ModalController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { VpsaleModalPage }  from '../../pages/vpsale-modal/vpsale-modal';
import { AddResourcePage }  from '../../pages/add-resource/add-resource';

/**
 * Generated class for the VpSalesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vp-sales',
  templateUrl: 'vp-sales.html',
})
export class VpSalesPage {
  token:string;
  loginUser:any = {};
  vpsales:any;
  reqId:string;
  selectedId='';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public util: UtilsProvider,
    public restProvider:RestProvider,
    public viewCtrl : ViewController,
    
    public modalCtrl:ModalController,) {
      this.reqId = navParams.get('reqId');
      this.token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();
      this.VpOfSalesById();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccManagerPage');
  }

  radioClicked(vpId){   
    this.selectedId=vpId;
    console.log("selectedId",this.selectedId)
  }
  VpOfSalesById(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.VpOfSalesById(this.token,this.reqId)
    .then( res=> {
      this.vpsales = res;
      console.log("this.vpsales",this.vpsales)
      loading.dismiss();
     
    },error => {
      loading.dismiss();
    });
  }
  goBack(){
    this.viewCtrl.dismiss();
  }

  editUser(id){
    let chooseModal = this.modalCtrl.create(VpsaleModalPage,{userid:id});
    console.log("this.userIdccccccccccc",id)
    chooseModal.present(); 
  }

  submitData(){
   
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    
    
  
    let jsonData = {
     
      'requirementId': this.reqId,
      'vpId':this.selectedId,
        user:this.loginUser,
        userJwtBean:{
          emailId:this.loginUser.emailId,
          firstName: this.loginUser.firstName,
          id:this.loginUser.id,
          lastName:this.loginUser.lastName,
          role:this.loginUser.role,
          userName:this.loginUser.userName
        }
      
       
      
    }
    jsonData.user.groupsSet=[];
    jsonData.user.technicalScreenerDetailsSkillsSet=[];
    console.log(jsonData);
  
    loading.present();   
      this.restProvider.selectvpOfSales(jsonData,this.token)
        .then(data => {
          loading.dismiss();
          this.navCtrl.push(AddResourcePage,{reqId:this.reqId});
          this.util.showToast("Successfully Submitted.","SUCCESS");
          //this.viewCtrl.dismiss();
        },error => {
          loading.dismiss();
          this.util.showToast("Something went wrong.","ERROR");
          console.log(error);
      });
      
   
  }
 
}
