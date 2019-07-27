import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ViewController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { TechnicalQuestionPage }  from '../../pages/technical-question/technical-question';

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
  token:string;
  generals:Array<Object> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public viewCtrl : ViewController,
    public util: UtilsProvider,) {
    this.token = this.util.getToken();
    this.reqId = navParams.get('reqId');
    this.genquestionById();
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GeneralQuestionsPage');
  }

  goBack(){
    this.navCtrl.pop();
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
    this.navCtrl.push(TechnicalQuestionPage,{reqId:this.reqId});
  console.log("adyasa",this.reqId);
  }
}
