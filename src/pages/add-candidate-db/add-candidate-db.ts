import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController ,ViewController,PopoverController,ModalController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { CandidateSidePopoverComponent }  from '../../components/candidate-side-popover/candidate-side-popover';
import { EditCandidateDbPage }  from '../../pages/edit-candidate-db/edit-candidate-db';
import { SelectCandidateDbModalPage }  from '../../pages/select-candidate-db-modal/select-candidate-db-modal';

/**
 * Generated class for the AddCandidateDbPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-candidate-db',
  templateUrl: 'add-candidate-db.html',
})
export class AddCandidateDbPage {
  reqId:string;
  workflowId:string;
  actMgrId:string;
  loginUser:any={};
  token:string;
  candidates:any;
  selecteddetails=[];
  jobTitle:string;
  interviewType:string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public util: UtilsProvider,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public viewCtrl : ViewController,
    public popoverCtrl: PopoverController,
    public modalCtrl:ModalController,
    ) {
      this.reqId = navParams.get('reqId');
      this.workflowId = navParams.get('workflowId');
      this.actMgrId = navParams.get('actMgrId');
      this.jobTitle = navParams.get('jobTitle');
      this.interviewType = navParams.get('interviewType');
      this.token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();
      this.getCandidatesFromDb();
      console.log("interviewType",this.interviewType)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCandidateDbPage');
  }
 
  getCandidatesFromDb(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.candidatesfromdb(this.token,this.reqId)
    .then( res=> {
      this.candidates = res;
      console.log('this.Clients',this.candidates);
      loading.dismiss();
     
    },error => {
      loading.dismiss();
    });

    
  }
 
  radioClicked(details){

    let updateItem = this.selecteddetails.find(this.findIndexToUpdate, details.candidateId);

    let index = this.selecteddetails.indexOf(updateItem);

   // console.log(index);

    if(index > -1){
      this.selecteddetails.splice(index, 1);
      console.log(this.selecteddetails);
    }
    else{
      this.selecteddetails.push(details);
      console.log(this.selecteddetails);
    }

   

  }

  findIndexToUpdate(details) { 
        return details.candidateId === this;
  }


  goBack(){
    this.viewCtrl.dismiss();
 }
 presentPopover(myEvent,details){
  let popover = this.popoverCtrl.create(CandidateSidePopoverComponent,details);
 
  popover.present({
   
   ev: myEvent,
 
   
  });
 console.log("candidates",details);
}

gotoEditdetails(details){
  this.navCtrl.push(EditCandidateDbPage,{canId:details.candidateId});

  console.log("helllo",details.candidateId);
}

addCandidate(){
  
  
  let chooseModal = this.modalCtrl.create(SelectCandidateDbModalPage,{reqId:this.reqId,selecteddetails:this.selecteddetails,interviewType:this.interviewType});
   console.log("gggggggggggggggggggginterviewType",this.interviewType);
    chooseModal.present(); 
}

}
