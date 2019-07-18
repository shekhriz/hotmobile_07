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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider,
    public util: UtilsProvider,
    public viewCtrl : ViewController) {
    this.selecteddetails = navParams.get('selecteddetails');
    this.selecteddetails = navParams.get('selecteddetails');
    this.interviewType = navParams.get('interviewType');
    this.reqId = navParams.get('reqId');

    console.log("interviewType",this.interviewType);
    this.token = this.util.getToken();
   

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCandidateDbModalPage');
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }

  onSelectChange(details) {
    console.log("adi",details.tempInterviewType);
    if(details.tempInterviewType == 'Zoom' || details.tempInterviewType == 'Skype' || details.tempInterviewType == 'Two way'){
      this.restProvider.getRequirementUserStatics(this.token,this.reqId)
      .then((res:any)=>{
        this.scrData = res;
       console.log('scrData',this.scrData) 
      },errrr=>{
      });
    }
    console.log(" selectedType",this.selectedType)
  
  }
}
