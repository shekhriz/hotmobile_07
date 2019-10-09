



import { Component } from '@angular/core';
import { IonicPage,NavController,MenuController, NavParams,LoadingController,PopoverController,AlertController,ViewController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { CandidatePopoverComponent }  from '../../components/candidate-popover/candidate-popover';
import { CreateCandidatePage }  from '../../pages/create-candidate/create-candidate';
import { AddCandidateDbPage }  from '../../pages/add-candidate-db/add-candidate-db';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

/**
 * Generated class for the CandidatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-candidate',
  templateUrl: 'candidate.html',
})
export class CandidatePage {
  token:string;
  candidates:Array<any> = [];
  user:any;
  loginUser:any;
  reqId:any;
  workflowId:string;
  actMgrId:string;
  candidateLink:string;
  jobTitle:string;
  interviewType:string;
  interviewArray =[];
  currentReqActions:any={};
  candidateEnableDisable:boolean;
  tempStatus:Array<Object> = [];
  hideMe:boolean=false;
  selectedCandidates:any;
  constructor(public util: UtilsProvider,
    public navParams: NavParams,
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public viewCtrl : ViewController,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController) {
      this.menuCtrl.enable(true);
      this.token = this.util.getToken();
      this.reqId = navParams.get('reqId');
      this.workflowId = navParams.get('workflowId');
      this.actMgrId = navParams.get('actMgrId');
      this.candidateLink = navParams.get('candidateLink');
      this.jobTitle = navParams.get('jobTitle');
      this.interviewType = navParams.get('interviewType');
      this.currentReqActions =navParams.get('currentReqActions');
      if(this.candidateEnableDisable != null ||this.candidateEnableDisable != undefined){
        this.candidateEnableDisable =navParams.get('candidateEnableDisable');
      }
      
      console.log('candidateEnableDisable',this.candidateEnableDisable);
      console.log('workflowId',this.workflowId);
      console.log('currentReqActions',this.currentReqActions);
     

      this.loginUser = this.util.getSessionUser();
      this.candidatesById(this.loginUser);
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CandidatePage');
  }

  candidatesById(user){
  
    let loading = this.loadingCtrl.create({
      cssClass: 'transparent',
      spinner:'bubbles'
    });
    
    loading.present();
    this.restProvider.candidates(this.token,this.reqId,user)
    .then((data:any) => {
        this.candidates = data;
       
        loading.dismiss();
      console.log("hhhhhasdsdhh",this.candidates);
      console.log("length",this.candidates.length);
    

      this.candidates.forEach(function(candidate) {

               if(candidate.status){
                 let statusArray =  candidate.status.split(',');
                let statusLength = statusArray.length;
                 candidate.totalRounds = [];
                 console.log('statusLength',statusLength);
                  if(statusLength > 1){
                    for(let i =1;i <= statusLength;i++){
                      candidate.totalRounds.push({i});
                 console.log('totalArray', candidate.totalRounds);

                    }
             

                  }
               }
           
          
             
      })
      
      console.log("changed Array", this.candidates);

      
      
     
    },error => {
        this.util.showToast("Something went wrong.","ERROR");
        loading.dismiss();
       // console.log(error);
    });
    
      let jsonContact = {
        "role":this.loginUser.role,
        "userId":this.loginUser.id,
        "workflowId":this.workflowId
      }
      console.log('workflowId',this.workflowId);
     
      this.restProvider.allowedActions(jsonContact,this.token)
      .then(res => {
    
      },error => {
      
      })
   
    
  }

  presentPopover(myEvent,candidate){
    
    
    let popover = this.popoverCtrl.create(CandidatePopoverComponent, {candidate, currentReqActions: this.currentReqActions,mainWorkflowId:this.workflowId});
    popover.present({
     ev: myEvent  
    });
  console.log('popover',popover);
  }

  goBack(){
     this.viewCtrl.dismiss();
  }
  gotoAddCandidate(){
    this.navCtrl.push(CreateCandidatePage,{reqId:this.reqId,workflowId:this.workflowId,actMgrId:this.actMgrId});
    console.log("adyasa,workflowId",this.workflowId,"iiiiii",this.actMgrId);
  }
 
  candidateLinkActive(candidate){
    //this.viewCtrl.dismiss();
    let confirm = this.alertCtrl.create({
      title: 'Regenerate Link',
      message:  candidate.candidateLink,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('No clicked');
          }
        }
      ]
    });
    confirm.present();
    console.log( "candidatecandidateLink",candidate.candidateLink);
  }

  AddCandidateDb(){
    this.interviewArray =[this.interviewType];
    this.navCtrl.push(AddCandidateDbPage,{reqId:this.reqId,workflowId:this.workflowId,actMgrId:this.actMgrId,jobTitle:this.jobTitle,interviewType:this.interviewType,currentReqActions:this.currentReqActions});
  //  console.log("adyasa,workflowId",this.reqId,this.workflowId,"interviewType",this.interviewType);
    console.log('currentReqActions',this.currentReqActions);

  }
  onSelectChange(selectedvalue1,selectedvalue2){
    

      if(selectedvalue1.i >1){
        
            this.restProvider.getsecondRound(this.reqId,selectedvalue2,selectedvalue1.i,this.token)
           
          .then((res:any) => {
           
           // this.candidates = res;
           // this.hideMe = !this.hideMe;
           // console.log('this.hideMe',this.hideMe);
            console.log('selectedCandidates',this.selectedCandidates);

          },error => {
          
          })
          return ;
       }
    
  
   
   
  }
}