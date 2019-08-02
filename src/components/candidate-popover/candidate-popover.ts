import { Component } from '@angular/core';
import { App,IonicPage,NavController, NavParams,LoadingController,PopoverController,ModalController,ViewController,AlertController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { CandidateResponsePage }  from '../../pages/candidate-response/candidate-response';
import { EditcandidatePage }  from '../../pages/editcandidate/editcandidate';
import { CandidateHisModalPage }  from '../../pages/candidate-his-modal/candidate-his-modal';
import { AddNotesPage }  from '../../pages/add-notes/add-notes';
import { FeedbackFormPage }  from '../../pages/feedback-form/feedback-form';


/**
 * Generated class for the CandidatePopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'candidate-popover',
  templateUrl: 'candidate-popover.html'
})
export class CandidatePopoverComponent {

  text: string;
  token:string;
  cId:string;
  reqId:string;
  response:any;
  workflowId:string;
  loginUser:any;
  user:any;
  linkCount:string;
  candidate:string;
  submitToClient:string;
  submissionType:string;
  status:string;
  candidateEnableDisable:string;
  firstName:string;
  isBlackListed:string;
  candidateLink:string;

  constructor(public navCtrl: NavController,
    public util: UtilsProvider,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public navParams: NavParams,
    public appCtrl: App,
    public alertCtrl: AlertController,
    public viewCtrl : ViewController,
    public modalCtrl:ModalController,) {
      this.cId=navParams.get('candidateId');  
      this.reqId=navParams.get('positionId');  
      this.workflowId=navParams.get('workflowId');  
      this.candidateLink = navParams.get('candidateLink'); 
      this.linkCount = navParams.get('linkCount'); 
      this.candidateEnableDisable =navParams.get('candidateEnableDisable');
      this.submitToClient =navParams.get('submitToClient');
      this.submissionType =navParams.get('submissionType');
      this.status =navParams.get('status');
      this.loginUser = this.util.getSessionUser();
      this.token = this.util.getToken();
      this.firstName = navParams.get('firstName');
      this.isBlackListed = navParams.get('isBlackListed');
   console.log("this.workflowId",this.candidateEnableDisable);
   console.log("this.submitToClient",this.submitToClient);
   console.log("this.submissionType",this.submissionType);
  }
  

  responseCandidate(){
    this.viewCtrl.dismiss();
   
    this.appCtrl.getRootNav().push(CandidateResponsePage,{cId:this.cId,reqId: this.reqId,workflowId:this.workflowId});
    console.log(this.cId,this.reqId)
  }
  editCandidate()
  {
    this.appCtrl.getRootNav().push(EditcandidatePage,{cId:this.cId,reqId: this.reqId,workflowId:this.workflowId});
    console.log(this.cId,this.reqId)
    this.viewCtrl.dismiss();
  }
  
  regenerateLink(){
    this.viewCtrl.dismiss();
    let confirm = this.alertCtrl.create({
      title: 'Regenerate Link',
      message: 'Are you sure you want to Re-Generate link to this Candidate',
      buttons: [
        {
          text: 'Cancel',
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
              "user":this.loginUser,
            }
            jsonData.user.groupsSet = [];
            jsonData.user.technicalScreenerDetailsSkillsSet = [];
           
            loading.present();
            this.restProvider.regenerateLink(this.token,this.reqId,this.cId,jsonData.user)
            .then(res => {
              loading.dismiss();
              this.util.showToast("Link Submitted sucessfuly","SUCCESS");
              
            },error => {
              loading.dismiss();
              this.util.showToast("Something went wrong.","ERROR");
            })

            this.restProvider.regenerateEmail(this.token,this.reqId,this.cId,jsonData.user)
            .then(res => {
            
            },error => {
            
            })

            this.restProvider.candidates(this.token,this.reqId,jsonData.user)
            .then(res => {
         
            },error => {
             
            })

          }
        }
      ]
    });
    confirm.present();
    
  }

  reactivateLink(){
    this.viewCtrl.dismiss();
    let confirm = this.alertCtrl.create({
      title: 'Reactivate Link',
      message: 'Are you sure you want to Re-Activate link to this Candidate',
      buttons: [
        {
          text: 'Cancel',
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
              "user":this.loginUser,
            }
            jsonData.user.groupsSet = [];
            jsonData.user.technicalScreenerDetailsSkillsSet = [];
           
            loading.present();

            this.restProvider.reactivateLink(this.token,this.reqId,this.cId,jsonData.user)
            .then(res => {
              loading.dismiss();
              this.util.showToast("Link Submitted sucessfuly","SUCCESS");
              
            },error => {
              loading.dismiss();
              this.util.showToast("Something went wrong.","ERROR");
            })

            this.restProvider.reactivateEmail(this.token,this.reqId,this.cId,jsonData.user)
            .then(res => {
            
            },error => {
            
            })

            this.restProvider.candidates(this.token,this.reqId,jsonData.user)
            .then(res => {
         
            },error => {
             
            })
          }
        }
      ]
    });
    confirm.present();
  }

  candidateHistory(){
    this.appCtrl.getRootNav().push(CandidateHisModalPage,{canId:this.cId});
    this.viewCtrl.dismiss();

  }
  candidateRemove(){
    this.viewCtrl.dismiss();
    let confirm = this.alertCtrl.create({
      title: 'Remove : '+this.firstName,
      message: 'Are you sure you want to Remove this Candidate:'+this.firstName,
      buttons: [
        {
          text: 'Cancel',
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
              "user":this.loginUser,
            }
            jsonData.user.groupsSet = [];
            jsonData.user.technicalScreenerDetailsSkillsSet = [];
           
            loading.present();

            this.restProvider.removeCandidate(this.token,this.reqId,this.cId,jsonData.user)
            .then(res => {
              loading.dismiss();
              this.util.showToast("Candidate deleted sucessfuly","SUCCESS");
              this.restProvider.candidates(this.token,this.reqId,jsonData.user)
              .then(res => {
           
              },error => {
               
              })
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

  disableCandidate(){
    this.viewCtrl.dismiss();
    let confirm = this.alertCtrl.create({
      title: 'Disable : '+this.firstName,
      message: 'Please mention the reason for disabling: '+this.firstName+ '?',
      buttons: [
        {
          text: 'Cancel',
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
              'candidateId': this.cId,
              'candidateStatus': this.candidateEnableDisable,
              'disableComment': "hw",
              'requirementId': this.reqId,
              userJwtBean:{
                'emailId':this.loginUser.emailId,
                'firstName':this.loginUser.firstName,
                'id':this.loginUser.id,
                'lastName':this.loginUser.lastName,
                'role':this.loginUser.role,
                'userName':this.loginUser.userName
              }
            }
            
           
            loading.present();

            this.restProvider.disableCandidate(this.token,jsonData)
            .then(res => {
              loading.dismiss();
              this.util.showToast("Candidate deleted sucessfuly","SUCCESS");
              
                this.restProvider.refresh(this.token)
                .then(res => {
                  
                    let jsonData = {
                      "user":this.loginUser,
                    }
                    jsonData.user.groupsSet = [];
                    jsonData.user.technicalScreenerDetailsSkillsSet = [];
                  
               
                      this.restProvider.candidates(this.token,this.reqId,jsonData.user)
                    .then(res => {
                    //  this.navCtrl.push(CandidatePage);
                    },error => {
                    
                    })
                },error => {
                
                })
              
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
  blacklistedCandidate(){
    let confirm = this.alertCtrl.create({
      title: 'Blacklist :'+this.firstName,
      message: 'Are you sure you want to Blacklist this Candidate:'+this.firstName+'?',
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
           
            'blackListReason': 'ddddd',
            'isBlackListed':  this.isBlackListed,
            'candidateId': this.cId,
           
            }
           
  
            loading.present();
            this.restProvider.updateCandidateBlackListStatus(jsonData,this.token)
            .then(data => {
              //this.ccRequirement = data;
              loading.dismiss();
              this.util.showToast("Added sucessfuly","SUCCESS");
             
            },error => {
              loading.dismiss();
              this.util.showToast("Something went wrong.","ERROR");
            })
            
            this.restProvider.candidates(this.token,this.reqId,this.loginUser)
            .then(data => {
              //this.ccRequirement = data;
              loading.dismiss();
              this.util.showToast("Added sucessfuly","SUCCESS");
             
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

  addNotes(){
    this.viewCtrl.dismiss();
    let chooseModal = this.modalCtrl.create(AddNotesPage,{reqId:this.reqId,cId:this.cId});
    console.log("this.userIdccccccccccc",this.cId,this.reqId)
    chooseModal.present(); 
   
  }
  candidateFeedback(){
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(FeedbackFormPage,{cId:this.cId,reqId:this.reqId,candidateLink:this.candidateLink,submissionType:this.submissionType});

    console.log("candidateLink",this.candidateLink)
  }
 
 
}
