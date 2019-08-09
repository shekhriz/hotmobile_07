import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ViewController,ModalController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { MgrRecruitingModalPage }  from '../../pages/mgr-recruiting-modal/mgr-recruiting-modal';
import { AddResourcePage }  from '../../pages/add-resource/add-resource';


/**
 * Generated class for the MgrRecruitingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mgr-recruiting',
  templateUrl: 'mgr-recruiting.html',
})
export class MgrRecruitingPage {
  token:string;
  loginUser:any = {};
  mgrRec:any;
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
      this.ManagerOfRecruitingById();
  }

  ionViewDidLoad() {
    
  }
  radioClicked(mgrId){
    
    this.selectedId=mgrId;
    console.log("selectedId",this.selectedId)
  }

  ManagerOfRecruitingById(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.ManagerOfRecruitingById(this.token,this.reqId)
    .then( res=> {
      this.mgrRec = res;
      console.log("this.accMgr",this.mgrRec)
      loading.dismiss();
     
    },error => {
      loading.dismiss();
    });
  }
  goBack(){
    this.viewCtrl.dismiss();
  }
  editUser(id){
    let chooseModal = this.modalCtrl.create(MgrRecruitingModalPage,{userid:id});
    console.log("this.userIdccccccccccc",id)
    chooseModal.present(); 
  }

  submitData(){
    this.viewCtrl.dismiss();
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    
    let jsonData = {
     
      
      'requirementId': this.reqId,
      'mgrId': this.selectedId,
      
       
        userJwtBean:{
          emailId:this.loginUser.emailId,
          firstName: this.loginUser.firstName,
          id:this.loginUser.id,
          lastName:this.loginUser.lastName,
          role:this.loginUser.role,
          userName:this.loginUser.userName
        }
      
       
      
    }
    
    console.log(jsonData);
  
    loading.present();   
      this.restProvider.selectmanagerOfRecruiting(jsonData,this.token)
        .then(data => {
        
          this.util.showToast("Successfully Submitted.","SUCCESS");
          this.navCtrl.push(AddResourcePage,{reqId:this.reqId});
        },error => {
          loading.dismiss();
          this.util.showToast("Something went wrong.","ERROR");
          console.log(error);
      });
      
   
  }
  
}

