import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the SelectCandidateDbModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-candidate-db-modal',
  templateUrl: 'select-candidate-db-modal.html',
})
export class SelectCandidateDbModalPage {
  selecteddetails:any;
  selectedType:any;
  token:string;
  scrData:any;
  interviewType:any;
  interviewName :any;
  reqId:string;
  submissionType:string;
  selectedScr:any;
  candidates:any;
  loginUser:any;
  candidateId:string;
  emailId:string;
  recScheduledDate:string;
  recScheduledTime:string;
  chancesOfExtension:string;
  educationalYear:string;
  isBlackListed:string;
  linkedInProfileURL:string;
  relocateWithFamily:string;
  id:string;
  willingToRelocate:string;
  tempArray:Array<Object> = [];
  tempArray2:Array<Object> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider,
    public util: UtilsProvider,
    public loadingCtrl:LoadingController,
    public viewCtrl : ViewController) {
    this.selecteddetails = navParams.get('selecteddetails');
   

    this.reqId = navParams.get('reqId');
    this.loginUser = this.util.getSessionUser();
    // Object.keys(this.selecteddetails).forEach(key => {
    //   this.selecteddetails[key].mySubType != "";
    // })
    // for(var i in this.selecteddetails){
    //   this.selecteddetails[i].mySubType = "";
    //   console.log(this.selecteddetails[key]);
    // }
   
   console.log("selecteddetails",this.selecteddetails);
   console.log("candidateId",this.selecteddetails.candidateId);
    this.token = this.util.getToken();
   

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCandidateDbModalPage');
  }
  

  onSelectChange(selectedValue) {
    
    console.log('Selected', selectedValue);
    this.submissionType = selectedValue;
    console.log("adyasa",this.submissionType); 
    if(this.submissionType == 'Zoom' || this.submissionType == 'Skype'){
      this.restProvider.getRequirementUserStatics(this.token,this.reqId)
      .then((data:any)=>{
        this.scrData = data
        console.log("rizwan",this.scrData); 
      },errrr=>{
      });
   

    }
    
  }

  submitCandidate(){
   
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    if(this.submissionType == undefined || this.submissionType == ""){
      this.util.showToast("Please select Submission Type.","ERROR");
      return;
    }

    // if(this.selectedScr == undefined || this.selectedScr == "" ){
    //   this.util.showToast("Please enter First Name.","ERROR");
    //   return;
    // }
    loading.present();
   
    Object.keys(this.selecteddetails).forEach(key => {
     if(this.selecteddetails[key].mySubType == "One Way" || this.selecteddetails[key].mySubType == "Prospect" || this.selecteddetails[key].mySubType == "Two Way") {
      this.tempArray.push({
        'candidateId': this.selecteddetails[key].candidateId,
        'chancesOfExtension': this.selecteddetails[key].chancesOfExtension,
        'educationalYear': this.selecteddetails[key].educationalYear,
        'emailId': this.selecteddetails[key].emailId,
        'internalSubEmailTemp': "",
        'isAlreadyAdded':false,
        'isBlackListed': this.selecteddetails[key].isBlackListed,
        'linkedInProfileURL':this.selecteddetails[key].linkedInProfileURL,
        'note': this.selecteddetails[key].note,
        'relocateWithFamily': this.selecteddetails[key].relocateWithFamily,
        'requirementId': this.reqId,
        'subVendorId': this.selecteddetails[key].subVendorId,
        'submissionType': this.selecteddetails[key].mySubType,
        'willingToRelocate': this.selecteddetails[key].willingToRelocate
      })
     }
     if(this.selecteddetails[key].mySubType == 'Zoom' ||this.selecteddetails[key].mySubType == 'Skype') {
      this.tempArray.push({
        'candidateId': this.selecteddetails[key].candidateId,
        'chancesOfExtension': this.selecteddetails[key].chancesOfExtension,
        'educationalYear': this.selecteddetails[key].educationalYear,
        'emailId': this.selecteddetails[key].emailId,
        'internalSubEmailTemp': "",
        'isAlreadyAdded':false,
        'isBlackListed': this.selecteddetails[key].isBlackListed,
        'linkedInProfileURL':this.selecteddetails[key].linkedInProfileURL,
        'note': this.selecteddetails[key].note,
        'relocateWithFamily': this.selecteddetails[key].relocateWithFamily,
        'requirementId': this.reqId,
        'body':"<!DOCTYPE html><body><p>Welcome to HOT</p></body></html>",
        'recScheduledDate':'',
        'screenByUser': this.scrData[key].firstName,
        'screenByUserEmail': this.scrData[key].emailId,
        'screenByUserId':this.scrData[key].id,
        'subVendorId': this.selecteddetails[key].subVendorId,
        'submissionType': this.selecteddetails[key].mySubType,
        'willingToRelocate': this.selecteddetails[key].willingToRelocate
      })
     }
     
 
console.log("candidateIdnmmmm",this.tempArray);

});
    let jsonData={
      candidatesBean:this.tempArray,

      "user":this.loginUser,
   
    }
    jsonData.user.groupsSet=[];
    jsonData.user.technicalScreenerDetailsSkillsSet=[];
    this.restProvider.addcandidates(this.token,jsonData)
    .then((data:any) => {  
      this.restProvider.AvailabilityTime(this.token)
      .then((data:any) => {
          this.restProvider.candidates(this.token,this.reqId,this.loginUser)
        
          .then((data:any) => {

            loading.dismiss();
            
          },error => {
              this.util.showToast("Something went wrong.","ERROR");
         
         // console.log(error);
      });
      //
      Object.keys(this.selecteddetails).forEach(key => {  
        let jsonData2={
          
            body:"<!DOCTYPE html><body><p>Welcome to HOT</p></body></html>",
            candidatesId:[this.selecteddetails[key].candidateId],
            isAlreadyAdded:false,
            requirementId:this.reqId,
            subject:"Candidate Added for the Requirement",
        
          "user":this.loginUser,
        }
        jsonData2.user.userImage= null;
        this.restProvider.fromFrontend(this.token,jsonData2)
        .then((data:any) => {
         // this.navCtrl.push(CandidatePage);
          
          if(this.selecteddetails[key].mySubType == "Zoom" ||this.selecteddetails[key].mySubType == "Skype"){
          let jsonData3={
          
              candidateEmail:this.selecteddetails[key].emailId,
              candidateId:this.selecteddetails[key].candidateId,
              date:"28-03-2019", 
              jwtDetails:{
                emailId:this.loginUser.emailId,
                firstName:this.loginUser.firstName,
                id:this.loginUser.id,
                lastName:this.loginUser.lastName,
                role:this.loginUser.role,
                userName:this.loginUser.userName
              },
                loginEmaild: this.loginUser.emailId,
                requirementId: this.reqId,
                screenByUser: this.scrData[key].firstName +''+this.scrData[key].lastName,
                screenByUserEmail: this.scrData[key].emailId,
                screenByUserId: this.scrData[key].id,
                submissionType: this.selecteddetails[key].mySubType,
                time:"16:05:00"
          }
        
           if(this.selecteddetails[key].mySubType == "Zoom"){
            this.restProvider.zoomApi(this.token,jsonData3)
            .then((data:any) => {
             // this.navCtrl.push(CandidatePage);
             
            },error => {
                this.util.showToast("Something went wrong.","ERROR");
               
               // console.log(error);
            });
           }

           if(this.selecteddetails[key].mySubType =='Skype'){
            this.restProvider.skypeApi(this.token,jsonData3)
            .then((data:any) => {
            // this.navCtrl.push(CandidatePage);
            },error => {
                this.util.showToast("Something went wrong.","ERROR");
           
               // console.log(error);
            });
           }
          }else{
            
          }
          
          });
        },error => {
            this.util.showToast("Something went wrong.","ERROR");
         
           // console.log(error);
        });
      //
      },error => {
          this.util.showToast("Something went wrong.","ERROR");
        
      });
   },error => {
      this.util.showToast("Something went wrong.","ERROR");
    
  }); 
    
  }
  closeModal(){
    this.navCtrl.pop();
  }
  cancelData(){
    this.viewCtrl.dismiss();

  }
 
}
