import { Component } from '@angular/core';
import {App, IonicPage,AlertController,ViewController, NavController, NavParams,LoadingController,PopoverController,ModalController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { TechScreenerPage }  from '../../pages/tech-screener/tech-screener';
import { VpSalesPage }  from '../../pages/vp-sales/vp-sales';
import { AccManagerPage }  from '../../pages/acc-manager/acc-manager';
import { MgrRecruitingPage }  from '../../pages/mgr-recruiting/mgr-recruiting';
import { RecruiterPage }  from '../../pages/recruiter/recruiter';



/**
 * Generated class for the AddResourcePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-resource',
  templateUrl: 'add-resource.html',
})
export class AddResourcePage {
  token:string;
  loginUser:any;
  reqId:any;
  workflowId:string;
  actMgrId:string;
  screener:any;
  jobTitle:string;
  manager:any;
  sales:any;
  recruiter:any;
  recruiters:any;
  accmanager:any;
  delAccount:any;
  recId:any;
  requirement:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public util: UtilsProvider,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public appCtrl: App,
    public modalCtrl:ModalController,
    public viewCtrl : ViewController,
    public alertCtrl: AlertController) {
      this.reqId = navParams.get('reqId');
      this.workflowId = navParams.get('workflowId');
      this.jobTitle =navParams.get('jobTitle');
      this.actMgrId =navParams.get('actMgrId');
      this.token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();
      this.displayTechScreener();
      this.displayRecruiter();
      this.displayAccountManager();
      this.displayVpOfSales();
      this.displayManagerOfRecruiting();
      console.log("this.actMgrId",this.actMgrId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddResourcePage');
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
//nav to modal
  goTechScreener(){
    let chooseModal = this.modalCtrl.create(TechScreenerPage,{reqId:this.reqId});
  //  console.log("gggggggggggggggggggg",this.question);
    chooseModal.present(); 
    
  } 
  goVpSales(){
    let chooseModal = this.modalCtrl.create(VpSalesPage,{reqId:this.reqId});
    //  console.log("gggggggggggggggggggg",this.question);
      chooseModal.present();
  }
  goAccManager(){
    let chooseModal = this.modalCtrl.create(AccManagerPage,{reqId:this.reqId});
    //  console.log("gggggggggggggggggggg",this.question);
      chooseModal.present();
  }
  goMgrRec(){
    let chooseModal = this.modalCtrl.create(MgrRecruitingPage,{reqId:this.reqId});
    //  console.log("gggggggggggggggggggg",this.question);
      chooseModal.present();
  }
  goRecruiter(){
    let chooseModal = this.modalCtrl.create(RecruiterPage,{reqId:this.reqId});
    //  console.log("gggggggggggggggggggg",this.question);
      chooseModal.present();
  }
//delete
  deleteAccManager(){
    let confirm = this.alertCtrl.create({
      title: 'Delete question',
      message: 'Are you sure you want to delete '+ this.accmanager.firstName + ' from ' +  this.jobTitle +'?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Please wait...'
            });
            
            let jsonData = {
             
            'actMgrId': this.actMgrId,
            'requirementId': this.reqId,
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
            this.restProvider.deleteAccountManager(jsonData,this.token)
            .then(data => {
              this.delAccount = data;
              loading.dismiss();
              this.editRequirements();
              this.displayTechScreener();
               this.displayRecruiter();
               this.displayAccountManager();
               this.displayVpOfSales();
               this.displayManagerOfRecruiting();  
               this.requirementResource();
              this.util.showToast("Account Manager Deleted sucessfuly","SUCCESS");
             
            },error => {
              loading.dismiss();
              this.util.showToast("Something went wrong.","ERROR");
            })
          }
        }
      ]
    });
    confirm.present();
  }

  deleteTechScreener(){
    let confirm = this.alertCtrl.create({
      title: 'Delete question',
      message: 'Are you sure you want to delete '+ this.screener.firstName + ' from ' +  this.jobTitle +'?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Please wait...'
            });
            
            let jsonData = {
            'recId': 0,
            'requirementId': this.reqId,
            'screenerId': this.screener.id,
            'user': this.loginUser
            }
            jsonData.user.groupsSet=[];
            jsonData.user.technicalScreenerDetailsSkillsSet=[];

            loading.present();
            this.restProvider.deletetechscreener(jsonData,this.token)
            .then(data => {
              this.delAccount = data;
              loading.dismiss();

              this.editRequirements();
              this.displayTechScreener();
               this.displayRecruiter();
               this.displayAccountManager();
               this.displayVpOfSales();
               this.displayManagerOfRecruiting();  
               this.requirementResource();
              this.util.showToast("Technical Screener Deleted sucessfuly","SUCCESS");
             
            },error => {
              loading.dismiss();
              this.util.showToast("Something went wrong.","ERROR");
            })
          }
        }
      ]
    });
    confirm.present();
  }

  deleteVpSales(){
    let confirm = this.alertCtrl.create({
      title: 'Delete question',
      message: 'Are you sure you want to delete '+ this.sales.firstName + ' from ' +  this.jobTitle +'?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Please wait...'
            });
            
            let jsonData = {
           
            'requirementId': this.reqId,
            'vpId': this.sales.id,
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
            this.restProvider.deleteVpOfSales(jsonData,this.token)
            .then(data => {
              this.delAccount = data;
              loading.dismiss();
              this.editRequirements();
              this.displayTechScreener();
               this.displayRecruiter();
               this.displayAccountManager();
               this.displayVpOfSales();
               this.displayManagerOfRecruiting();  
               this.requirementResource();
              this.util.showToast("Vp Of Sales Deleted sucessfuly","SUCCESS");
             
            },error => {
              loading.dismiss();
              this.util.showToast("Something went wrong.","ERROR");
            })
          }
        }
      ]
    });
    confirm.present();
  }

  deleteMgrRec(){
    let confirm = this.alertCtrl.create({
      title: 'Delete question',
      message: 'Are you sure you want to delete '+ this.manager.firstName + ' from ' +  this.jobTitle +'?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Please wait...'
            });
            
            let jsonData = {
            'mgrId': this.manager.id,
            'requirementId': this.reqId,
            
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
            this.restProvider.deleteManagerOfRecruiting(jsonData,this.token)
            .then(data => {
              this.delAccount = data;
              loading.dismiss();
              this.editRequirements();
              this.displayTechScreener();
               this.displayRecruiter();
               this.displayAccountManager();
               this.displayVpOfSales();
               this.displayManagerOfRecruiting();  
               this.requirementResource();
              this.util.showToast("Manager Of Recruiting Deleted sucessfuly","SUCCESS");
             
            },error => {
              loading.dismiss();
              this.util.showToast("Something went wrong.","ERROR");
            })
          }
        }
      ]
    });
    confirm.present();
  }

  deleteRecruiter(rec){
    let confirm = this.alertCtrl.create({
      title: 'Delete question',
      message: 'Are you sure you want to delete '+ rec.firstName + ' from ' +  this.jobTitle +'?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Please wait...'
            });
            
            let jsonData = {
            'recId': rec.id,
            'requirementId': this.reqId,
            'screenerId': 0,
            'user':this.loginUser
           
            }
           jsonData.user.groupsSet = [];
           jsonData.user.technicalScreenerDetailsSkillsSet = [];

            loading.present();
            this.restProvider.deleterecruiter(jsonData,this.token)
            .then(data => {
              this.delAccount = data;
              loading.dismiss();
              this.editRequirements();
              this.displayTechScreener();
               this.displayRecruiter();
               this.displayAccountManager();
               this.displayVpOfSales();
               this.displayManagerOfRecruiting();  
               this.requirementResource();
              this.util.showToast("Recruiters Deleted sucessfuly","SUCCESS");
             
            },error => {
              loading.dismiss();
              this.util.showToast("Something went wrong.","ERROR");
            })
          }
        }
      ]
    });
    confirm.present();
  }


  goBack(){
    this.viewCtrl.dismiss();
  }
  requirementResource(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    this.restProvider.requirementResource(this.token,this.reqId)
    .then((data:any) => {
        this.requirement = data[0];
        loading.dismiss();
      console.log(" this.requirement", this.requirement)
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
}
