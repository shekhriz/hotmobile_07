import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ViewController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { GeneralQuestionsPage }  from '../../pages/general-questions/general-questions';

/**
 * Generated class for the TechnicalQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-technical-question',
  templateUrl: 'technical-question.html',
})
export class TechnicalQuestionPage {
  reqId:string;
  token:string;
  technicals:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public viewCtrl : ViewController,
    public util: UtilsProvider,) {
    this.token = this.util.getToken();
    this.reqId = navParams.get('reqId');
   
    this.techquestionById();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TechnicalQuestionPage');
  }
 techquestionById(){
  
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    this.restProvider.technicalQuestions(this.token,this.reqId)
    .then((data:any) => {
        this.technicals = data.positionTechnicalQuestionList;
        loading.dismiss();
      console.log("hhhhhasdsdhh",this.technicals);
      
    },error => {
        this.util.showToast("Something went wrong.","ERROR");
        loading.dismiss();
       // console.log(error);
    });
    
  }
  gotoGeneral(){
    this.navCtrl.push(GeneralQuestionsPage,{reqId:this.reqId});
  }
  goBack(){
    this.navCtrl.pop();
 }
}
