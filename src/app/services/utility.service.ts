import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }
   // Function to check date ranges
   checkDateRanges = (dOB:any,dOJ:any):any => {
    let birth = moment(dOB).format('YYYY-MM-DD');
    let join = moment(dOJ).format('YYYY-MM-DD');
    if (birth > join) {
      // console.log('birth:', birth, ' ', 'join:', join)
      return true;
      // this.errMessageOfDates = 'Date of Joining Must be greater than Date of Birth';
      // this.userForm.get('date_of_joining')?.setErrors(this.errMessageOfDates);
    } else {
      return false;
      // this.errMessageOfDates = '';
      // this.userForm.get('date_of_joining')?.setErrors(this.errMessageOfDates);
    }
  };
}
