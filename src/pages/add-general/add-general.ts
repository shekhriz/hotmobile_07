import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ViewController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { DisplayQuestionsPage }  from '../../pages/display-questions/display-questions';

/**
 * Generated class for the AddGeneralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-general',
  templateUrl: 'add-general.html',
})
export class AddGeneralPage {
  token:string;
  loginUser:any;

  option1:string;
  option2:string;
  option3:string;
  option4:string;
  option5:string;
  option6:string;
  questionName:string;
  type:string;
  myModel: any;
  edited:any;
  generalModule: boolean ;
  technicalModule:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public viewCtrl : ViewController,
    public util: UtilsProvider,) {
      this.token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();
      this.technicalModule=navParams.get('technicalModule');  
     // console.log('technicalModule',this.technicalModule);

      this.myModel ='';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGeneralPage');
  }
  onSelectChange(selectedValue) {
    this.myModel = selectedValue;
   // console.log('Selected', this.myModel);
    //console.log('selectedValue', selectedValue);
  
  }
  submit(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    let jsonData = {
      
      generalQuestion:{
        "addToPosition":"yes",
        "option1":this.option1,
        "option2":this.option2,
        "option3":this.option3,
        "option4":this.option4,
        "option5":this.option5,
        "option6":this.option6,
        "questionName":this.questionName,
        "type":this.type
      },
      questionType: "General",
      userJwtBean:{
        "emailId":this.loginUser.emailId,
        "firstName":this.loginUser.firstName,
        "id":this.loginUser.id,
        "lastName":this.loginUser.lastName,
        "role":this.loginUser.role,
        "userName":this.loginUser.userName
      }

    }
   // console.log("json",jsonData);
    loading.present();   
      this.restProvider.addTechnicalQuestion( this.token,jsonData)
        .then(data => {
         
          loading.dismiss();
        //  this.navCtrl.push(GeneralQuestionPage);
          this.util.showToast("Successfully Submitted.","SUCCESS");
          // console.log("data",data); 
        },error => {
            loading.dismiss();
            this.util.showToast("Something went wrong.","ERROR");
          //  console.log(error);
        });
  }

  goBack(){
    this.navCtrl.push(DisplayQuestionsPage,this.technicalModule);
  // console.log("jjjjjjjjjjjj",this.technicalModule)

  }

}
