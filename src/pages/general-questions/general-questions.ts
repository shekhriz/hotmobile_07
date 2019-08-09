import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ViewController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { TechnicalQuestionPage }  from '../../pages/technical-question/technical-question';
import { RequirementsPage } from '../../pages/requirements/requirements';
import { GeneralDbPage }  from '../../pages/general-db/general-db';
import { AddGeneralPage }  from '../../pages/add-general/add-general';
/**
 * Generated class for the GeneralQuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-general-questions',
  templateUrl: 'general-questions.html',
})
export class GeneralQuestionsPage {
  reqId:string;
  lastMileStone:string;
  token:string;
  generals:Array<Object> = [];
  allowAction:any;
  currentReqActions:any={};
  workflowId:string;
  
  submit:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public viewCtrl : ViewController,
    public util: UtilsProvider,) {
    this.token = this.util.getToken();
    this.reqId = navParams.get('reqId');
    this.lastMileStone = navParams.get('lastMileStone');
    this.workflowId=navParams.get('workflowId');
    this.currentReqActions =navParams.get('currentReqActions');
   
    this.submit= navParams.get('submit');
    console.log(' this.currentReqActions', this.currentReqActions);
   
    console.log(' this.workflowId', this.workflowId);
   
   

    this.genquestionById();
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GeneralQuestionsPage');
  }

  goBack(){
    //this.navCtrl.pop();
    this.navCtrl.push(RequirementsPage);

 }
  genquestionById(){
  
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    this.restProvider.generalQuestions(this.token,this.reqId)
    .then((data:any) => {
        this.generals = data.positionGeneralQuestionList;
        loading.dismiss();
      console.log("hhhhhasdsdhh",this.generals);
      
    },error => {
        this.util.showToast("Something went wrong.","ERROR");
        loading.dismiss();
       // console.log(error);
    });
    
  }
  gotoTechnicals(){
    this.navCtrl.push(TechnicalQuestionPage,{reqId:this.reqId,lastMileStone:this.lastMileStone,currentReqActions:this.currentReqActions,workflowId:this.workflowId});
  console.log("adyasa",this.reqId);
  console.log("lastMileStone",this.lastMileStone);
  }
  addQuestionDb(){
    this.navCtrl.push(GeneralDbPage,{reqId:this.reqId});
  }
  createNew(){
  this.navCtrl.push(AddGeneralPage);

  }
}
