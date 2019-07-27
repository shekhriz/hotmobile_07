import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ViewController,ModalController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { RecruiterModalPage }  from '../../pages/recruiter-modal/recruiter-modal';
import { AddResourcePage }  from '../../pages/add-resource/add-resource';

/**
 * Generated class for the RecruiterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recruiter',
  templateUrl: 'recruiter.html',
})
export class RecruiterPage {
  token:string;
  loginUser:any = {};
  recruiter:any;
  reqId:string;
  result:any;
  manager:any;
  sales:any;
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
      this.RecruiterById();
  }

  ionViewDidLoad() {
    
  }

  radioClicked(recId){
    
    this.selectedId=recId;
    console.log("selectedId",this.selectedId)
  }

  RecruiterById(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.RecruiterById(this.token,this.reqId)
    .then( res=> {
      this.recruiter = res;
      console.log("this.accMgr",this.recruiter)
      loading.dismiss();
     
    },error => {
      loading.dismiss();
    });
  }
  goBack(){
    this.viewCtrl.dismiss();
  }

  editUser(id){
    let chooseModal = this.modalCtrl.create(RecruiterModalPage,{userid:id});
    console.log("this.userIdccccccccccc",id)
    chooseModal.present(); 
  }

  submitData(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    let jsonData = {
     
      'requirementId': this.reqId,
      'recruiterIDs':[this.selectedId],
      
        user :this.loginUser,
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
      this.restProvider.selectRecruiter(jsonData,this.token,)
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
        this.screener = data[0];
        console.log()
        loading.dismiss("this.screener",this.screener);
     
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
        this.recruiter = data[0];
        this.recruiters =data;
        
        loading.dismiss();
     console.log("this.recruiters",this.recruiters);
     console.log("this.recruiter",this.recruiter);
    
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
        this.accmanager = data[0];
        loading.dismiss();
        console.log(" this.managers", this.accmanager)
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
        this.sales = data[0];
        loading.dismiss();
     console.log(" this.sales", this.sales)
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
        this.manager = data[0];
        loading.dismiss();
      console.log(" this.manager", this.manager)
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
        this.manager = data[0];
        loading.dismiss();
      console.log(" this.manager", this.manager)
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
        this.manager = data[0];
        loading.dismiss();
      console.log(" this.manager", this.manager)
    },error => {
        
        loading.dismiss();
       // console.log(error);
    });
  } 
}
