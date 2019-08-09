import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ViewController,ModalController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { AccMgrModalPage }  from '../../pages/acc-mgr-modal/acc-mgr-modal';
import { AddResourcePage }  from '../../pages/add-resource/add-resource';

/**
 * Generated class for the AccManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-acc-manager',
  templateUrl: 'acc-manager.html',
})
export class AccManagerPage {
  token:string;
  loginUser:any = {};
  accMgr:any;
  reqId:string;

  result:any;
  manager:any;
  sales:any;
  recruiter:any;
  recruiters:any;
  accmanager:any;
  screener:any;
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
      this.AccountManagerById();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccManagerPage');
  }

  radioClicked(vpId){   
    this.selectedId=vpId;
    console.log("selectedId",this.selectedId)
  } 

  AccountManagerById(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.AccountManagerById(this.token,this.reqId)
    .then( res=> {
      this.accMgr = res;
      console.log("this.accMgr",this.accMgr)
      loading.dismiss();
     
    },error => {
      loading.dismiss();
    });
  }
  goBack(){
    this.viewCtrl.dismiss();
  }

  editUser(id){
    let chooseModal = this.modalCtrl.create(AccMgrModalPage,{userid:id});
    console.log("this.userIdccccccccccc",id)
    chooseModal.present(); 
  }

  submitData(){
   
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    
    
  
    let jsonData = {
     
      'requirementId': this.reqId,
      'actMgrId':this.selectedId,   
        userJwtBean:{
          emailId:this.loginUser.emailId,
          firstName: this.loginUser.firstName,
          id:this.loginUser.id,
          lastName:this.loginUser.lastName,
          role:this.loginUser.role,
          userName:this.loginUser.userName
        }   
    }
   
    loading.present();   
      this.restProvider.selectaccountManager(jsonData,this.token)
        .then(data => {
          this.navCtrl.push(AddResourcePage,{reqId:this.reqId});
          this.util.showToast("Successfully Submitted.","SUCCESS");
         
        },error => {
          loading.dismiss();
          this.util.showToast("Something went wrong.","ERROR");
          console.log(error);
      });
      
   
  }
  displayTechScreener(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    this.restProvider.displayTechScreener(this.token,this.reqId)
    .then((data:any) => {
       
        loading.dismiss();
     
    },error => {
        
        loading.dismiss();
       // console.log(error);
    });
    
  }

  displayRecruiter(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    this.restProvider.displayRecruiter(this.token,this.reqId)
    .then((data:any) => {
       
        loading.dismiss();
   
    },error => {
        
        loading.dismiss();
       // console.log(error);
    });
    
  }

  displayAccountManager(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    this.restProvider.displayAccountManager(this.token,this.reqId)
    .then((data:any) => {
       
        loading.dismiss();
       
    },error => {
        
        loading.dismiss();
       // console.log(error);
    });
    
  }

  displayVpOfSales(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    this.restProvider.displayVpOfSales(this.token,this.reqId)
    .then((data:any) => {
    
        loading.dismiss();
    
    },error => {
        
        loading.dismiss();
       // console.log(error);
    });
    
  }

  displayManagerOfRecruiting(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    this.restProvider.displayManagerOfRecruiting(this.token,this.reqId)
    .then((data:any) => {
     
        loading.dismiss();
    
    },error => {
        
        loading.dismiss();
       // console.log(error);
    });
    
  }
  editRequirements(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    this.restProvider.editRequirements(this.reqId,this.token)
    .then((data:any) => {
      
        loading.dismiss();
     
    },error => {
        
        loading.dismiss();
       // console.log(error);
    });
  }
  requirementResource(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    this.restProvider.requirementResource(this.token,this.reqId)
    .then((data:any) => {
    
        loading.dismiss();
      
    },error => {
        
        loading.dismiss();
       // console.log(error);
    });
  } 
}
