import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { SearchViewPage }  from '../../pages/search-view/search-view';
import {FormGroup, FormControl} from '@angular/forms';

/**
 * Generated class for the CandidateSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-candidate-search',
  templateUrl: 'candidate-search.html',
})
export class CandidateSearchPage {
  hideMe:boolean=false;
  showMe:boolean = true;
  token:string;
  dateRange:string="90";
  division:string="";
  empCompanyName:string="";
  jobTitle:string="";
  keywords:string="";
  location:string="";
  maxExp:number=0;
  minExp:number=0;
  name:string="";
  recruiter:string="";
  skills:string="";
  status:string="All";
  locationTag:string="contains";
  workAuthorisation:string;
  nameTag:any="";
  skillTag:any="";
  jobTitleTag:any="";
  empOrCompnayNameTag:any="";
  divisionTag:any="";
  workAuthorizationTag:any="";
  recruiterTag:any="";
  selectname:any;
  selectskill:any;
  selectjob:any;
  selectemp:any;
  selectdivision:any;
  selectwork:any;
  selectrecruiter:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider,
    public util: UtilsProvider,

    
    ) {
      this.token = this.util.getToken();
      this.nameTag = new FormGroup({
        "selectname": new FormControl({value: 'contains', disabled: false})
      });
      this.skillTag = new FormGroup({
        "selectskill": new FormControl({value: 'contains', disabled: false})
      });
      this.jobTitleTag = new FormGroup({
        "selectjob": new FormControl({value: 'contains', disabled: false})
      });
      this.empOrCompnayNameTag = new FormGroup({
        "selectemp": new FormControl({value: 'contains', disabled: false})
      });
      this.divisionTag = new FormGroup({
        "selectdivision": new FormControl({value: 'contains', disabled: false})
      });
      this.workAuthorizationTag = new FormGroup({
        "selectwork": new FormControl({value: 'contains', disabled: false})
      });
      this.recruiterTag = new FormGroup({
        "selectrecruiter": new FormControl({value: 'contains', disabled: false})
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CandidateSearchPage');
  }
  // doSubmit(event) {
  //   console.log('Submitting form', this.jobTitleTag.value);
  //   event.preventDefault();
  //   //this.jobTitle = event;
  // }
  showAdvanceSearch(){
    this.hideMe = true;
    this.showMe = false;
  }
  hideAdvanceSearch(){
    this.hideMe = false;
    this.showMe = true;
  }
  
  submit(){
    let jsonData ={
      'dateRange': this.dateRange,
      'division':this.division,
      'divisionType': this.divisionTag.value.selectdivision,
      'empCompanyName': this.empCompanyName,
      'empCompanyNameType': this.empOrCompnayNameTag.value.selectemp,
      'jobTitle': this.jobTitle,
      'jobTitleType': this.jobTitleTag.value.selectjob,
      'keywords': this.keywords,
      'location': this.location,
      'locationType': this.locationTag,
      'maxExp':this.maxExp,
      'minExp': this.minExp,
      'name': this.name,
      'nameType': this.nameTag.value.selectname,
      'recruiter': this.recruiter,
      'recruiterType': this.recruiterTag.value.selectrecruiter,
      'skills': this.skills,
      'skillsType': this.skillTag.value.selectskill,
      'status': this.status,
      'workAuthorisation': this.workAuthorisation,
      'workAuthorisationType':this.workAuthorizationTag.value.selectwork
    }
    this.restProvider.internalSearch(jsonData,this.token)
    .then((data:any)=>{
    this.navCtrl.push(SearchViewPage,{Details:data,jsonData:jsonData});
        console.log(data);
        console.log(jsonData);
    },errrr=>{
      console.log(errrr)

    });
  }
}
