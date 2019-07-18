import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ViewController,ModalController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { GeneralQuestionPage }  from '../../pages/general-question/general-question';
import { AddTechnicalPage }  from '../../pages/add-technical/add-technical';
import { EditTechnicalModelPage }  from '../../pages/edit-technical-model/edit-technical-model';


/**
 * Generated class for the DisplayQuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-display-questions',
  templateUrl: 'display-questions.html',
})
export class DisplayQuestionsPage {
  reqId:string;
  token:string;
  technicals:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public viewCtrl : ViewController,
    public util: UtilsProvider,
    public modalCtrl:ModalController) {
    this.token = this.util.getToken();
  
   
    this.techquestion();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TechnicalQuestionPage');
  }
 techquestion(){
  
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    this.restProvider.techQuestion(this.token)
    .then((data:any) => {
        this.technicals = data;
        loading.dismiss();
    // console.log("hhhhhasdsdhh",this.technicals);
      
    },error => {
        this.util.showToast("Something went wrong.","ERROR");
       // loading.dismiss();
       // console.log(error);
    });
    
  }
  gotoGeneral(){
    this.navCtrl.push(GeneralQuestionPage);
  }
  goBack(){
    this.navCtrl.pop();
 }
 addTechnical(){
  this.navCtrl.push(AddTechnicalPage);
 }
 editQusetion(id){
  let chooseModal = this.modalCtrl.create(EditTechnicalModelPage,{userid:id});
  chooseModal.present();
  console.log("helllo",id);
}
}
