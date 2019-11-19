import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,MenuController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { HomePage } from '../home/home';
import { OneSignal } from '@ionic-native/onesignal';
import { CandidateResponsePage }  from '../../pages/candidate-response/candidate-response';

 

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  isLogin:boolean = true;
  username:string;
  password:string;
  email:string;
  result:any;
  additionalData:any;
  showMe:boolean = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public util: UtilsProvider,
              public restProvider: RestProvider,
              public loadingCtrl: LoadingController,
              public menuCtrl: MenuController,
              private oneSignal: OneSignal,
             
   ) {
              this.menuCtrl.enable(false);
     

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
   
    let loading = this.loadingCtrl.create({
      cssClass: 'transparent',
      spinner:'bubbles'
    });

    if(this.username == undefined || this.username == ""){
      this.util.showToast("Please enter username.","ERROR");
      return;
    }

    if(this.password == undefined || this.password == ""){
      this.util.showToast("Please enter password.","ERROR");
      return;
    }

    this.isLogin = false;
    this.showMe = true;
    loading.present();
    let getToken = {
      'username':this.username,
      'password':this.password
    }

    let jsonData = {
      'userName':this.username,
      'password':this.password
    }
    this.restProvider.getToken(getToken)
    .then((token:any) => {
      console.log('token',token.token);
      this.util.saveToken(token.token);
      this.util.saveTokenTime(new Date().getTime());
      this.restProvider.newLogin(jsonData,token.token)
      .then(data => {
        this.result = data;
        this.util.saveSessionUser(data);
      
          //this.setupPush();
     
        loading.dismiss();
        this.util.showToast("Successfully Login.","SUCCESS");
        this.navCtrl.push(HomePage);
      },error => {
          loading.dismiss();
          this.util.showToast("Something went wrong.","ERROR");
          console.log(error);
      });

        this.restProvider.login(jsonData,token.token)
        .then(data => {
          this.util.saveSessionUser(data);
        //  loading.dismiss();
         // this.util.showToast("Successfully Login.","SUCCESS");
        //  this.navCtrl.push(HomePage);
        },error => {
          //  loading.dismiss();
         //   this.util.showToast("Something went wrong.","ERROR");
            console.log(error);
        });
    },error => {
        loading.dismiss();
        this.util.showToast("Something went wrong.","ERROR");
        console.log(error);
    });
  }

  forgotPassword(){
    this.isLogin = false;
    
  }

  gotoLogin(){
    this.isLogin = true;
  }

  resetPassword(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if(this.email == undefined || this.email == ""){
      this.util.showToast("Please enter email address.","ERROR");
      return;
    }
    if(!this.util.emailValidate(this.email)){
      this.util.showToast("Email address is not valid.","ERROR");
      return;
    }
    loading.present();
    this.restProvider.forgotPassword(this.email)
    .then(res => {
        loading.dismiss();
        this.util.showToast("Passowrd reset Successfully, Please check your email","SUCCESS");
        this.isLogin = true;
        this.restProvider.forgotPasswordEmail(this.email).then(res => {
          this.email = "";
        },error => {});
    },error => {
        loading.dismiss();
        this.util.showToast("Something went wrong.","ERROR");
        console.log(error);
    });

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
      this.navCtrl.push(CandidateResponsePage,{cId:this.additionalData.cid,reqId:this.additionalData.pId});

      console.log('Notification opened', 'You already read this before', additionalData.task);
    });
   
        this.oneSignal.endInit(); 
  }
}
