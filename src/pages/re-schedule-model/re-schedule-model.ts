import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { CandidatePage }  from '../../pages/candidate/candidate';
import { DatePickerDirective } from 'ion-datepicker';

import moment from 'moment';
/**
 * Generated class for the ReScheduleModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface Coordinate {
  x: number;
  y: number;
}
@IonicPage()
@Component({
  selector: 'page-re-schedule-model',
  templateUrl: 're-schedule-model.html',
})
export class ReScheduleModelPage {
  candidate_details:Array<Object> = [];
  selecteddetails:any={};
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
  tempArray2:Array<any> = [];
  arr:any = [];
  workflowId:any;
  timezone:string;
  initTime:string;
  finalDate:string;
  finalTime:string;
  startDateNew:string;
  endDateNew:string;
  selectedDate:string;
  zoomCount :number= 0;
  time:string;
  timeDiv:boolean=false;
  currentReqActions:any={};
  currentCandidate : number = -1;
  hideMe:boolean= false;
  link:string;
  fullName:string;
  screenByUserId:string;

  @ViewChild(DatePickerDirective) public datepicker: DatePickerDirective;
  public localDate: Date = new Date();
  public initDate :Date = new Date();
  public initDate2 :Date = new Date();
  public startDate: Date = new Date();

  
  public min = new Date();
  @ViewChild('hourClock') hourClock;
  @ViewChild('minuteClock') minuteClock;
  hour: string;
  minute: string;
  ampm: string;
  selecting = 'hour';
  hourHandStyle: Object;
  minuteHandStyle: Object;
  hours: Array<string> = [
      '9',
      '10',
      '11',
      '12',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8'
  ];
  minutes: Array<string> = [
      '45',
      '50',
      '55',
      '00',
      '05',
      '10',
      '15',
      '20',
      '25',
      '30',
      '35',
      '40'
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider,
    public util: UtilsProvider,
    public loadingCtrl:LoadingController,
    public viewCtrl : ViewController,
    ) {
     
      this.selecteddetails = navParams.get('selecteddetails');
      this.link = navParams.get('link');
     
      console.log('this.link',this.link);
     
       console.log("this.selecteddetails", this.selecteddetails);

    
        this.selecteddetails.recScheduledDate = this.initDate;  
        this.selecteddetails.screeningDate = this.initDate2;     
        //this.selecteddetails[key].recScheduledTime = null ;

  
      
    this.reqId = navParams.get('reqId');
    this.workflowId = navParams.get('workflowId');
    this.loginUser = this.util.getSessionUser();
    this.currentReqActions =navParams.get('currentReqActions');
   
   console.log("selecteddetails",this.selecteddetails);
   console.log("time",this.time);
  // console.log("candidateId",this.selecteddetails.candidateId);
    this.token = this.util.getToken();
    
    this.restProvider.getRequirementUserStatics(this.token,this.selecteddetails.positionId)
      .then((data:any)=>{
        this.scrData = data
        console.log("rizwan",this.scrData);
      },errrr=>{
      });

  }
  ionViewDidLoad() {
    const time = this.navParams.get('time');
    try {
        this.hour = time.match(/(\d+):/)[1];
        this.minute = time.match(/:(\d+)/)[1];
        this.ampm = time.match(/([AP]M)/)[1];
    } catch (error) {
        console.log('error: ', error);
        this.hour = '6';
        this.minute = '00';
        this.ampm = 'PM';
    }
    const hourAngle = this.hours.indexOf(this.hour) * 30 - 90;
    const minuteAngle = this.minutes.indexOf(this.minute) * 30 - 90;
    this.hourHandStyle = {
        '-webkit-transform': `rotate(${hourAngle}deg)`,
        '-moz-transform': `rotate(${hourAngle}deg)`,
        transform: `rotate(${hourAngle}deg)`
    };
    this.minuteHandStyle = {
        '-webkit-transform': `rotate(${minuteAngle}deg)`,
        '-moz-transform': `rotate(${minuteAngle}deg)`,
        transform: `rotate(${minuteAngle}deg)`
    };
    console.log('ionViewDidLoad SelectCandidateDbModalPage');
  }

  ////////////date///////
  public ngOnInit() {

  }
  
  showDate(){
    console.log(this.selectedDate)
  }
  public Log(stuff): void {
    this.datepicker.open();
    this.datepicker.changed.subscribe(() => console.log('test'));
    console.log(stuff);
  }

  public event(data: Date): void {
    this.localDate = data;
  }
  setDate(date:Date) {
    console.log(date);
    this.initDate = date;


  }

//////////end///////////////


//////////////
  onSelectChange(selectedValue) {

    console.log('Selected', selectedValue);
    this.submissionType = selectedValue;
    console.log("adyasa",this.submissionType);
   

  }
 
  onSelectChange2(selectedValue) {
    this.submissionType = selectedValue;
    console.log("submissionType",this.submissionType);

    this.fullName = selectedValue;
      Object.keys(this.scrData).forEach(key=> {
        if(this.scrData[key].firstName +' '+this.scrData[key].lastName == selectedValue){
            this.emailId=this.scrData[key].emailId;
            this.screenByUserId=this.scrData[key].id;
        }
      }); 

  }  
  onSelectChange3(selectedValue){
   
      this.fullName=selectedValue;
  
      Object.keys(this.scrData).forEach(key=> {
        if(this.scrData[key].firstName +' '+this.scrData[key].lastName == selectedValue){
        this.emailId=this.scrData[key].emailId;
        this.screenByUserId=this.scrData[key].id;
      }
      }); 
     
    

  }
  closeModal(){
    this.navCtrl.pop();
  }
  cancelData(){
    this.viewCtrl.dismiss(this.selecteddetails);
   // this.navCtrl.pop();
  }
  goBack(){
    this.viewCtrl.dismiss();

  }
  selectTime(){
    this.timeDiv= true;
   // this.currentCandidate++;
  }



 /////////date///
 getHour(angle) {
  const index = Math.round(angle / 30);
  if (index > -1 || index === -6) {
      this.hour = this.hours[Math.abs(index)];
      this.hourHandStyle = {
          '-webkit-transform': `rotate(${Math.abs(index) * 30 - 90}deg)`,
          '-moz-transform': `rotate(${Math.abs(index) * 30 - 90}deg)`,
          transform: `rotate(${Math.abs(index) * 30 - 90}deg)`
      };
  } else {
      this.hour = this.hours[12 - Math.abs(index)];
      this.hourHandStyle = {
          '-webkit-transform': `rotate(${(12 - Math.abs(index)) * 30 -
              90}deg)`,
          '-moz-transform': `rotate(${(12 - Math.abs(index)) * 30 -
              90}deg)`,
          transform: `rotate(${(12 - Math.abs(index)) * 30 - 90}deg)`
      };
  }
  this.selecting = 'minute';
}

getMinute(angle) {
  const index = Math.round(angle / 30);
  if (index > -1 || index === -6) {
      this.minute = this.minutes[Math.abs(index)];
      this.minuteHandStyle = {
          '-webkit-transform': `rotate(${Math.abs(index) * 30 - 90}deg)`,
          '-moz-transform': `rotate(${Math.abs(index) * 30 - 90}deg)`,
          transform: `rotate(${Math.abs(index) * 30 - 90}deg)`
      };
  } else {
      this.minute = this.minutes[12 - Math.abs(index)];
      this.minuteHandStyle = {
          '-webkit-transform': `rotate(${(12 - Math.abs(index)) * 30 -
              90}deg)`,
          '-moz-transform': `rotate(${(12 - Math.abs(index)) * 30 -
              90}deg)`,
          transform: `rotate(${(12 - Math.abs(index)) * 30 - 90}deg)`
      };
  }
}

tappedClock(event) {
  const clicked: Coordinate = {
      x: event.clientX,
      y: event.clientY
  };
  const clock =
      this.selecting === 'hour' ? this.hourClock : this.minuteClock;
  const rectangle = clock.nativeElement.getBoundingClientRect();
  const clockCenter: Coordinate = {
      x: rectangle.width / 2 + rectangle.left,
      y: rectangle.height / 2 + rectangle.top
  };
  const angle =
      Math.atan2(clockCenter.y - clicked.y, clockCenter.x - clicked.x) *
      180 /
      Math.PI;

  if (this.selecting === 'hour') {
      this.getHour(angle);
  } else {
      this.getMinute(angle);
  }
}

// cancel() {
//   this.viewCtrl.dismiss();
// }

getTime() {
  this.time =`${this.hour}:${this.minute} ${this.ampm}`
  //if(this.currentCandidate != null || this.currentCandidate != undefined){
  this.selecteddetails.recScheduledTime = this.time;

 // }
  this.timeDiv = false;
console.log('timenjkkk',this.time)
}
submitCandidate(){
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  this.selecteddetails.mySubType == [];
    if(this.selecteddetails.mySubType == 'Zoom'){
      
      console.log("this.zoomCount",this.zoomCount)
      if(this.selecteddetails.selectedScr == undefined || this.selecteddetails.selectedScr == ""){
        this.util.showToast("Please select Screened by","ERROR");
        return;
      } 
      if(this.selecteddetails.recScheduledDate == undefined || this.selecteddetails.recScheduledDate == ""){
        this.util.showToast("Please select Date","ERROR");
        return;
      } 
      if(this.selecteddetails.recScheduledTime == undefined || this.selecteddetails.recScheduledTime == ""){
        this.util.showToast("Please select Time","ERROR");
        return;
      } 
      if(this.selecteddetails.timezone == undefined || this.timezone == ''){
        this.util.showToast("Please select Timezone","ERROR");
        return;
      } 
     
    }
    let jsonData_reschedule = {};
    let jsonData_regenerate = {};
   jsonData_reschedule={
               
      candidateEmail:this.selecteddetails.emailId,
      candidateId:this.selecteddetails.candidateId,
      clientLink: "string",
      convertedTime: "string",
      date:moment(this.selecteddetails.recScheduledDate).format("DD-MM-YYYY"),
      interviewRound: "1",
      jwtDetails:{
        emailId:this.loginUser.emailId,
        firstName:this.loginUser.firstName,
        id:this.loginUser.id,
        lastName:this.loginUser.lastName,
        role:this.loginUser.role,
        userName:this.loginUser.userName
      },
        previousDate: "2019-09-27",
        previousSubmissionType: this.submissionType,
        previousTime: "12:35:00 PM",
        recScheduledDate:moment(this.selecteddetails.recScheduledDate).format("DD-MM-YYYY"),
        recScheduledTime: moment(this.selecteddetails.recScheduledTime, ["h:mm A"]).format("HH:mm:ss"),
        loginEmaild: this.loginUser.emailId,
        requirementId: this.selecteddetails.positionId,
        screenByUser:this.fullName,
        screenByUserEmail: this.emailId,
        screenByUserId: this.screenByUserId,
        submissionType: this.submissionType,
        time: moment(this.time, ["h:mm A"]).format("HH:mm:ss"),
        timezone:this.selecteddetails.timezone
        
    }
    jsonData_regenerate={
               
      candidateEmail:this.selecteddetails.emailId,
      candidateId:this.selecteddetails.candidateId,
      clientLink: "string",
      convertedTime: "string",
      date:moment(this.selecteddetails.recScheduledDate).format("DD-MM-YYYY"),
      interviewRound: "1",
      jwtDetails:{
        emailId:this.loginUser.emailId,
        firstName:this.loginUser.firstName,
        id:this.loginUser.id,
        lastName:this.loginUser.lastName,
        role:this.loginUser.role,
        userName:this.loginUser.userName
      },
       // previousDate: "2019-09-27",
        previousSubmissionType: this.submissionType,
       // previousTime: "12:35:00 PM",
        recScheduledDate:moment(this.selecteddetails.recScheduledDate).format("DD-MM-YYYY"),
        recScheduledTime: moment(this.selecteddetails.recScheduledTime, ["h:mm A"]).format("HH:mm:ss"),
        loginEmaild: this.loginUser.emailId,
        requirementId: this.selecteddetails.positionId,
        screenByUser:this.fullName,
        screenByUserEmail: this.emailId,
        screenByUserId: this.screenByUserId,
        submissionType: this.submissionType,
        time: moment(this.time, ["h:mm A"]).format("HH:mm:ss"),
        timezone:this.selecteddetails.timezone
        
    }  
  if(this.link == 'rescheduleInterview'){
    this.restProvider.AvailabilityTime(this.token,moment(this.selecteddetails.recScheduledDate).format("DD-MM-YYYY"), moment(this.time, ["h:mm A"]).format("HH:mm:ss"))
    .then((data:any) => {  
      console.log('this.selecteddetails.recScheduledDate',this.selecteddetails.recScheduledDate)
      if(data == "Meeting rooms are available"){  
        this.restProvider.rescheduleInterview(jsonData_reschedule,this.token)
        .then((data:any) => {  
          this.navCtrl.push(CandidatePage,{reqId:this.selecteddetails.positionId,workflowId:this.workflowId,currentReqActions:this.currentReqActions});
          loading.dismiss();
          this.util.showToast("Meeting schedule successfully.","SUCCESS");
        },error => {
          loading.dismiss();
      
        });
      }else{
          this.util.showToast("All the rooms are booked during the selected time, Please select different time OR Contact with system admin.","ERROR");
        }
      },error => {
      
      });
  }else if(this.link == 'regenerateZoomInterview'){
    this.restProvider.AvailabilityTime(this.token,moment(this.selecteddetails.recScheduledDate).format("DD-MM-YYYY"), moment(this.time, ["h:mm A"]).format("HH:mm:ss"))
    .then((data:any) => {  
      console.log('this.selecteddetails.recScheduledDate',this.selecteddetails.recScheduledDate)
      if(data == "Meeting rooms are available"){  
        this.restProvider.deleteZoomMeeting((this.selecteddetails.candidateLink).substring(28,18),this.token)
        .then((data:any) => { 
          this.restProvider.regenerateZoomInterview(jsonData_regenerate,this.token)
          .then((data:any) => { 
            this.navCtrl.push(CandidatePage,{reqId:this.selecteddetails.positionId,workflowId:this.workflowId,currentReqActions:this.currentReqActions});
            loading.dismiss();
            this.util.showToast("Meeting regenerate successfully.","SUCCESS");
          },error => {
            loading.dismiss();
          }); 
        },error => {
      
        });
       
      }else{
        this.util.showToast("All the rooms are booked during the selected time, Please select different time OR Contact with system admin.","ERROR");
      }
        
      },error => {
        this.util.showToast("Something went Wrong","ERROR");

      
      });
  }else if(this.link == 'updateSubmissionType'){
    if(this.submissionType == 'Prospect' || this.submissionType == 'One Way'){
      let jsonData={
        'candidateId': this.selecteddetails.candidateId,
        'emailId': this.selecteddetails.emailId,
        'isAlreadyAdded': true,
        'jwtDetails':{
          'emailId': this.loginUser.emailId,
          'firstName': this.loginUser.fileName,
          'id': this.loginUser.id,
          'lastName': this.loginUser.lastName,
          'role': this.loginUser.role,
          'userName': this.loginUser.userName
        },
        'previousSubmissionType': "Prospect",
        'requirementId': this.selecteddetails.positionId,
        'submissionType': this.submissionType
      }
      this.restProvider.updateSubmissionType(jsonData,this.token)
      .then((data:any)=>{
        this.navCtrl.push(CandidatePage,{reqId:this.selecteddetails.positionId,workflowId:this.workflowId,currentReqActions:this.currentReqActions});
        console.log('workflowId',this.workflowId);
        console.log('reqId',this.selecteddetails.positionId);
        console.log('currentReqActions',this.currentReqActions);
        loading.dismiss();
            this.util.showToast("Candidate Interview Type Updated successfully and email sent successfully.","SUCCESS");
      },errrr=>{
        loading.dismiss();
        this.util.showToast("Something went Wrong","ERROR");

      });
    }else if(this.submissionType == 'Zoom'){
      let jsonData={
        'candidateId': this.selecteddetails.candidateId,
        'emailId': this.selecteddetails.emailId,
        'isAlreadyAdded': true,
        'jwtDetails':{
          'emailId': this.loginUser.emailId,
          'firstName': this.loginUser.fileName,
          'id': this.loginUser.id,
          'lastName': this.loginUser.lastName,
          'role': this.loginUser.role,
          'userName': this.loginUser.userName
        },
        'previousSubmissionType': "Prospect",
        'requirementId': this.selecteddetails.positionId,
        'submissionType': this.submissionType,
        'screenByUser': this.fullName,
        'screenByUserEmail': this.emailId,
        'screenByUserId': this.screenByUserId,
        'recScheduledDate':moment(this.selecteddetails.recScheduledDate).format("DD-MM-YYYY"),
        'recScheduledTime': moment(this.selecteddetails.recScheduledTime, ["h:mm A"]).format("HH:mm:ss"),
        'timezone':this.selecteddetails.timezone,


      }
      this.restProvider.AvailabilityTime(this.token,moment(this.selecteddetails.recScheduledDate).format("DD-MM-YYYY"), moment(this.time, ["h:mm A"]).format("HH:mm:ss"))
      .then((data:any) => { 
        if(data == "Meeting rooms are available"){
            this.restProvider.updateSubmissionType(jsonData,this.token)
            .then((data:any)=>{
              this.navCtrl.push(CandidatePage,{reqId:this.selecteddetails.positionId,workflowId:this.workflowId,currentReqActions:this.currentReqActions});
              loading.dismiss();  
              this.util.showToast("Candidate Interview Type Updated successfully and email sent successfully.","SUCCESS");
            },errrr=>{
              loading.dismiss();
              this.util.showToast("Something went Wrong","ERROR");
    
            });
          }else{
            this.util.showToast("All the rooms are booked during the selected time, Please select different time OR Contact with system admin.","ERROR");
          }
       
      },errrr=>{
      });
    }
   
    

    
  }
}








}

