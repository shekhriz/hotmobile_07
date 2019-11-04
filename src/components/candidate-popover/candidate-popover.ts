import { Component } from '@angular/core';
import { App,IonicPage,NavController, NavParams,LoadingController,PopoverController,ModalController,ViewController,AlertController,Platform} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { CandidateResponsePage }  from '../../pages/candidate-response/candidate-response';
import { EditcandidatePage }  from '../../pages/editcandidate/editcandidate';
import { CandidateHisModalPage }  from '../../pages/candidate-his-modal/candidate-his-modal';
import { AddNotesPage }  from '../../pages/add-notes/add-notes';
import { FeedbackFormPage }  from '../../pages/feedback-form/feedback-form';
import { CandidatePage }  from '../../pages/candidate/candidate';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileOpener } from '@ionic-native/file-opener';
import { AndroidPermissions } from '@ionic-native/android-permissions'
import { ReScheduleModelPage }  from '../../pages/re-schedule-model/re-schedule-model';
import { OneSignal } from '@ionic-native/onesignal';
import { normalizeURL } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';

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
  loginUser:any = {};
  user:any;
  linkCount:string;
  candidate:any;
  submitToClient:string;
  submissionType:string;
  status:string;
  candidateEnableDisable:boolean;
  firstName:string;
  isBlackListed:string;
  candidateLink:string;
  currentReqActions:any=[];
  mainWorkflowId:string;
  statusresult:any;
  appPath: string;
  dataPath: string;
  hideMe:boolean;
  additionalData:any;
  public fileUrl:any = '';
  private fileTransfer: FileTransferObject; 
  constructor(public navCtrl: NavController,
    public util: UtilsProvider,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public navParams: NavParams,
    public appCtrl: App,
    public alertCtrl: AlertController,
    public viewCtrl : ViewController,
    public modalCtrl:ModalController,
    private document: DocumentViewer,
    private file :File ,
    private transfer: FileTransfer,
    private platform:Platform,
    //public fileTransfer: FileTransferObject,
    public fileOpener: FileOpener,
    private oneSignal: OneSignal,
    private diagnostic: Diagnostic,
    private androidPermissions :AndroidPermissions) {
      this.candidate=navParams.get('candidate');
      this.mainWorkflowId=navParams.get('mainWorkflowId');

      this.cId=this.candidate.candidateId;  
      this.reqId=this.candidate.positionId;  
      this.candidateLink = this.candidate.candidateLink; 
      this.linkCount = this.candidate.linkCount; 
      this.candidateEnableDisable =this.candidate.candidateEnableDisable;
      this.submitToClient =this.candidate.submitToClient;
      this.submissionType =this.candidate.submissionType;
      this.workflowId =this.candidate.workflowId;
      this.status =this.candidate.status;
      this.loginUser = this.util.getSessionUser();
      this.token = this.util.getToken();
      this.firstName = this.candidate.firstName;
      this.isBlackListed = this.candidate.isBlackListed;
      this.currentReqActions =navParams.get('currentReqActions');
      
    //  this.allowedAction();
    console.log("this.candidate",this.candidate);
   
   console.log("this.workflowId",this.workflowId);
   console.log("this.loginUser",this.loginUser);
   console.log("this.currentReqActions",this.currentReqActions);
this.definePaths();
  }
  
  allowedAction(){
   
  }
  definePaths() {
    if (this.platform.is('ios')) {
      this.appPath = this.file.documentsDirectory;
      this.dataPath = this.file.documentsDirectory;

    } else {
      this.appPath = this.file.applicationDirectory;
      this.dataPath = this.file.dataDirectory;
      console.log('this.dataPath',this.dataPath)
      console.log('this.appPath',this.appPath)
    }
  }
  // previewResume(){
  //   const options:DocumentViewerOptions ={
  //     title:'My PDF'
  //   }
  //   this.document.viewDocument('file:///android_asset/www/assets/5-tools.pdf','application/pdf',options)
  //              console.log(this.document.viewDocument)


  //              let filePath = this.file.applicationDirectory + 'www/assets';
 
  //              if (this.platform.is('android')) {
  //                let fakeName = Date.now();
  //                this.file.copyFile(filePath, '5-tools.pdf', this.file.dataDirectory, `${fakeName}.pdf`).then(result => {
  //                  this.fileOpener.open(result.nativeURL, 'application/pdf')
  //                    .then(() => console.log('File is opened'))
  //                    .catch(e => console.log('Error opening file', e));
  //                })
  //              } else {
  //                // Use Document viewer for iOS for a better UI
  //                const options: DocumentViewerOptions = {
  //                  title: 'My PDF'
  //                }
  //                this.document.viewDocument(`${filePath}/5-tools.pdf`, 'application/pdf', options);
  //              }
  //  }
  
  getPermission() {
    
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
        result => {
          if (result.hasPermission) {
            this.downloadResume1();
          } else {
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(result => {
              if (result.hasPermission) {
                this.downloadResume1();
              }
            });
          }
        },
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      ); 
  }
  
   downloadResume1(){
    this.restProvider.downloadCandidateResume(this.token,this.candidate.candidateId,this.loginUser)
    .then(data => {
     
      this.util.showToast("Added sucessfuly","SUCCESS");
     
    },error => {

      this.util.showToast("Something went wrong.","ERROR");
    })

    const fileTransfer :FileTransferObject = this.transfer.create();
    let fileName = this.candidate.originalFileName;
 
     let link = this.candidate.resumeUrl;
 
      fileTransfer.download(link, this.file.externalRootDirectory  +'Download/'+ fileName).then((entry) => {
      console.log('download complete: ' + entry.toURL());
          let url = entry.toURL();
          let fileExtn=fileName.split('.').reverse()[0];
          let fileMIMEType=this.getMIMEtype(fileExtn);
      
          if (this.platform.is('ios')) {
            this.document.viewDocument(url, fileMIMEType, {});
            console.log('ios')
          } else {
            this.fileOpener.open(url, fileMIMEType)
              .then(() => console.log('File is opened'))
              .catch(e => console.log('Error opening file', e));
              console.log('android')
          }
        }, (error) => {
          console.log(error)
        });
   
     }
     getMIMEtype(extn){
      let ext=extn.toLowerCase();
      let MIMETypes={
        'txt' :'text/plain',
        'docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'doc' : 'application/msword',
        'pdf' : 'application/pdf',
        'jpg' : 'image/jpeg',
        'bmp' : 'image/bmp',
        'png' : 'image/png',
        'xls' : 'application/vnd.ms-excel',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'rtf' : 'application/rtf',
        'ppt' : 'application/vnd.ms-powerpoint',
        'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      }
      return MIMETypes[ext];
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
              this.setupPush();
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
                this.restProvider.editCandidate(this.token,this.reqId)
                .then(res => {
                  this.restProvider.detailsForDropdown(this.token,this.loginUser.id,this.loginUser.role)
                  .then(res => {
                  },error => {
                  
                  })
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

  disableCandidate(){
   
    this.viewCtrl.dismiss();

    let confirm = this.alertCtrl.create({
      title: 'Disable : '+this.firstName,
      message: 'Please mention the reason for disabling: '+this.firstName+ '?',
      inputs: [
        {
          name: this.candidate.reason,
         
        }
      ],
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
              'disableComment': this.candidate.reason,
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
              
                this.restProvider.disableCandidateEmail(this.token,jsonData)
                .then(res => {
                  
                    let jsonData = {
                      "user":this.loginUser,
                    }
                    jsonData.user.groupsSet = [];
                    jsonData.user.technicalScreenerDetailsSkillsSet = [];
                  
                      this.restProvider.editCandidate(this.token,this.reqId)
                      .then(res => {
                        this.navCtrl.push(CandidatePage,{reqId:this.reqId,workflowId:this.mainWorkflowId,currentReqActions:this.currentReqActions,candidateEnableDisable:this.candidateEnableDisable});
                        console.log('candidateEnableDisable',this.candidateEnableDisable);
                        console.log('currentReqActions',this.currentReqActions);
                      },error => {
                      
                      })
                    },error => {
                    
                    })
                },error => {
                
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
      inputs: [
        {
          name: 'this.blackListReason',
        }
      ],
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
           
            'blackListReason': 'this.blackListReason',
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
  RescheduleInterview(){
    this.hideMe = !this.hideMe;
  }
  reSchedule(){
   
    let chooseModal = this.modalCtrl.create(ReScheduleModelPage,{selecteddetails:this.candidate,link:'rescheduleInterview',currentReqActions:this.currentReqActions,workflowId:this.workflowId});
    console.log("this.userIdccccccccccc",this.candidate)
    chooseModal.present(); 
   // this.viewCtrl.dismiss();
  }
  reGenerate(){
   
    let chooseModal = this.modalCtrl.create(ReScheduleModelPage,{selecteddetails:this.candidate,link:'regenerateZoomInterview',currentReqActions:this.currentReqActions,workflowId:this.workflowId});
    console.log("this.userIdccccccccccc",this.candidate)
    chooseModal.present(); 
  }
  reScreening(){
    
    let chooseModal = this.modalCtrl.create(ReScheduleModelPage,{selecteddetails:this.candidate,link:'updateSubmissionType',currentReqActions:this.currentReqActions,workflowId:this.workflowId});
    chooseModal.present();
  }
  reSendEmail(){
    let confirm = this.alertCtrl.create({
      title: "Please resend the mail to the candidate.",
      message: 'Are you sure you want to Re-Send Email to this Candidate',
    
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
           
              'candidateId': this.cId,
              'interviewRound': this.candidate.interviewRounds,
              'jwtDetails':{
                'emailId': this.loginUser.emailId,
                'firstName': this.loginUser.fileName,
                'id': this.loginUser.id,
                'lastName': this.loginUser.lastName,
                'role': this.loginUser.role,
                'userName': this.loginUser.userName
              },
              'requirementId':this.reqId
            }
           
  
            loading.present();
            this.restProvider.reSendEmail(jsonData,this.token)
            .then(data => {
              this.navCtrl.push(CandidatePage,{reqId:this.reqId,workflowId:this.workflowId,currentReqActions:this.currentReqActions});
              loading.dismiss();
              this.util.showToast("Email sent sucessfuly","SUCCESS");
             
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
  cancelMeeting(){
    let x =(this.candidateLink).split('/');
    let meetingId = x[4];
    let confirm = this.alertCtrl.create({
      title: "Delete Zoom meeting",
      message: 'Are you sure you want to delete zoom meeting for candidate: ['+this.candidate.candidateId+']- '+this.candidate.candidateName,
      inputs: [
        {
          name: 'reason',
          placeholder: 'Reason',
          
        },
       
      ],
      
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: (data) => {
           
            if(data.reason == null ||data.reason ==''){
              this.util.showToast('Please write reason for cancel meeting',"ERROR")
              return;
            }else{
               let loading = this.loadingCtrl.create({
              content: 'Please wait...'
            });
            
                let jsonData = {
              
                  'cancelReason': data.reason,
                  'meetingId':meetingId ,
                  'userName': this.loginUser.userName,
                }
              
      
                loading.present();
                this.restProvider.cancelZoomMeeting(jsonData,this.token)
                .then(data => {
                  this.navCtrl.push(CandidatePage,{reqId:this.reqId,workflowId:this.workflowId,currentReqActions:this.currentReqActions});
                  loading.dismiss();
                  this.util.showToast("Email sent sucessfuly","SUCCESS");
                
                },error => {
                  loading.dismiss();
                  this.util.showToast("Something went wrong.","ERROR");
                })
             
            }
            
            //
          }
        }
      ]
    });
    confirm.present();
  }
 
  reGenEmail(){
    let confirm = this.alertCtrl.create({
      title: "Please resend the mail to the candidate.",
      message: 'Are you sure you want to Re-Send Email to this Candidate',
    
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
           
              'candidateId': this.cId,
              'interviewRound': this.candidate.interviewRounds,
              'jwtDetails':{
                'emailId': this.loginUser.emailId,
                'firstName': this.loginUser.fileName,
                'id': this.loginUser.id,
                'lastName': this.loginUser.lastName,
                'role': this.loginUser.role,
                'userName': this.loginUser.userName
              },
              'requirementId':this.reqId
            }
           
  
            loading.present();
            this.restProvider.regenerateEmail(this.token,this.reqId,this.cId,this.loginUser)
            .then(data => {
              this.navCtrl.push(CandidatePage,{reqId:this.reqId,workflowId:this.workflowId,currentReqActions:this.currentReqActions});
              loading.dismiss();
              this.util.showToast("Candidate Email is regenerated and email send successfully","SUCCESS");
             
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
  setupPush() {
    this.oneSignal.startInit('b7fd84f4-0a54-4550-9c4d-e12bac3a7cfe', '133871082435');
  
  //this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
  this.oneSignal.handleNotificationReceived().subscribe(data => {
    let msg = data.payload.body;
    let title = data.payload.title;
    this.additionalData = data.payload.additionalData;
    console.log(title, msg, this.additionalData);
   
  });
  
  // // // Notifcation was received in general
 

  // // Notification was really clicked/opened
  this.oneSignal.handleNotificationOpened().subscribe(data => {
    // Just a note that the data is a different place here!
    let additionalData = data.notification.payload.additionalData;
   // this.navCtrl.push(CandidateResponsePage,{cId:this.additionalData.cid,reqId:this.additionalData.pId});

    console.log('Notification opened', 'You already read this before', additionalData.task);
  });
 
      this.oneSignal.endInit();

}
   
}