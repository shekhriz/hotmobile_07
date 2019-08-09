import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ViewController,ModalController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { AddResourcePage }  from '../../pages/add-resource/add-resource';
import { TechnicalModalPage }  from '../../pages/technical-modal/technical-modal';

/**
 * Generated class for the TechScreenerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tech-screener',
  templateUrl: 'tech-screener.html',
})
export class TechScreenerPage {
  token:string;
  loginUser:any = {};
  techscreener:any={};
  reqId:string;
  userSet:any;
  rating: number = 4;
  user:any={};
  
  result:any;
  screener:any;
  selectedId='';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public util: UtilsProvider,
    public restProvider:RestProvider,
    public viewCtrl : ViewController,
    
    public modalCtrl:ModalController,
     ) {
      // events.subscribe('star-rating:changed', (starRating) => {
      //   console.log(starRating);
      //   this.rating = starRating;
      // });
      this.reqId = navParams.get('reqId');
      this.token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();
      this.TechnicalScreenerById();
      

  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad TechScreenerPage');
  }

  radioClicked(techId){
    
    this.selectedId=techId;
    console.log("selectedId",this.selectedId)
  }

  TechnicalScreenerById(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.TechnicalScreenerById(this.token,this.reqId)
    .then( res=> {
      this.techscreener = res;
      this.userSet = this.techscreener.userSet;
    
      loading.dismiss();
     
    },error => {
      loading.dismiss();
    });
  }

  goBack(){
     this.viewCtrl.dismiss();
  }
  editUser(id){
    let chooseModal = this.modalCtrl.create(TechnicalModalPage,{userid:id});
    console.log("this.userIdccccccccccc",id)
    chooseModal.present(); 
  }
  
  submitData(){
   
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    
    
  
    let jsonData = {
     
      'addGeneralQuestion': "No",
      'bidQuestionApprove': "No",
      'requirementId': this.reqId,
      'technicalSceenerIDs':[this.selectedId],
      
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
      this.restProvider.selectTechscreener(jsonData,this.token)
        .then(data => {
        
          loading.dismiss();
         
         this.navCtrl.push(AddResourcePage,{reqId:this.reqId});
         this.util.showToast("Successfully Submitted.","SUCCESS");
         console.log("this.reqId",this.reqId); 
        },error => {
          loading.dismiss();
          this.util.showToast("Something went wrong.","ERROR");
          console.log(error);
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
 
  
}
