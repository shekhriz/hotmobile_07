import { Component } from '@angular/core';
import { Platform,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { UtilsProvider } from '../providers/utils/utils';
import { RestProvider } from '../providers/rest/rest';
//import { FCM } from '@ionic-native/fcm/ngx';
//import { Router } from '@angular/router';
//import { OneSignal } from '@ionic-native/onesignal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  user:any;
  userToken:any;
  userTokenStartTime:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public utilProvider: UtilsProvider,
    public alertCtrl: AlertController,
    public restProvider: RestProvider,
 //  private oneSignal: OneSignal,
   public util: UtilsProvider,

    ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.user = this.utilProvider.getSessionUser();
      this.userToken = this.utilProvider.getToken();
      this.userTokenStartTime = this.utilProvider.getTokenTime();
    //  this.setupPush();
      if(this.userToken != undefined && this.userToken != null && this.userTokenStartTime != null && this.user != null) {
        this.rootPage = HomePage;
        let diff = (new Date().getTime() - this.userTokenStartTime) / 1000;
        diff /= 60;
        let exactDiff = Math.abs(Math.round(diff));

        console.log("Token Start Time : " + this.userTokenStartTime);
        console.log("Token completed time : " + exactDiff + " min");

        if(exactDiff < 30 && exactDiff > 25){
          this.restProvider.refreshToken(this.userToken)
          .then((response:any) =>{
            if(response.token != null){
              this.utilProvider.saveToken(response.token);
              this.utilProvider.saveTokenTime(new Date().getTime());
            }
          },error=>{
            this.utilProvider.removeAllLocalStorage();
            this.rootPage = LoginPage;
          });
        }else if(exactDiff >= 30){
            this.utilProvider.showToast("Session Expired, please Login again.","TIMEOUT");
            this.utilProvider.removeAllLocalStorage();
            this.rootPage = LoginPage;
        }
    }else{
      this.utilProvider.removeAllLocalStorage();
      this.rootPage = LoginPage;
    }
   

    });
  }

  // setupPush() {
  //   // I recommend to put these into your environment.ts
  //   this.oneSignal.startInit('b7fd84f4-0a54-4550-9c4d-e12bac3a7cfe', '133871082435');
 
  //   this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
 
  //   // Notifcation was received in general
  //   this.oneSignal.handleNotificationReceived().subscribe(data => {
  //     let msg = data.payload.body;
  //     let title = data.payload.title;
  //     let additionalData = data.payload.additionalData;
  //     console.log(title, msg, additionalData);
  //     if(additionalData.id == 1185){
  //       console.log('push notification is set');
  //     }
  //   });
 
  //   // Notification was really clicked/opened
  //   this.oneSignal.handleNotificationOpened().subscribe(data => {
  //     // Just a note that the data is a different place here!
  //     let additionalData = data.notification.payload.additionalData;
 
  //     console.log('Notification opened', 'You already read this before', additionalData.task);
  //   });
 
  //   this.oneSignal.endInit();
  // }
}
