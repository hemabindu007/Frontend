import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router ,RouterModule} from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import moment from 'moment';
import { TimesheetService } from '../services/timesheet.service';
import { UtilityService } from '../services/utility.service';
import { UserService } from '../services/user.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-dailog-form',
  standalone: true,
  imports: [CommonModule,HttpClientModule,ReactiveFormsModule,MatMomentDateModule,MatDatepickerModule,MatSelectModule,RouterModule,MatInputModule,MatFormField,MatDividerModule,FormsModule,MatCardModule,MatDialogModule,MatProgressSpinnerModule],
  templateUrl: './user-dailog-form.component.html',
  styleUrl: './user-dailog-form.component.css',
  providers:[UserService]
})
export class UserDailogFormComponent implements OnInit{
  userForm !: FormGroup;
  isLoading = false;
  public file: File | null = null;
  data :any;
  user:any
  action:any
  userdata:any;
errMessageOfDates:any
allRoles:any = [
  {roleName : 'Admin' , roleCode : '101'},
  {roleName : 'Employee' , roleCode : '102'}
]
  constructor(public timesheetService :TimesheetService,
    public route :ActivatedRoute,
    public router :Router,
    public utilityService:UtilityService,
    public userService : UserService,
    public snackBar :MatSnackBar
  ){
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const dataString = params['data'];
      this.data = JSON.parse(dataString);
      this.action = this.data.action;
      this.user = this.data.user
    });
    this.errMessageOfDates = 'Date of Joining is Required'
   this. userForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, 
        [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')],
        [this.timesheetService.emailExistsValidator()]),
      password: new FormControl('Welcome@123', [Validators.required]),
      emp_code: new FormControl(null, [Validators.required]),
      role: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      date_of_birth: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, [Validators.required, Validators.pattern('[0-9/+/-]*')]),
      date_of_joining: new FormControl(null,[Validators.required]),
      _id: new FormControl(null),
    });
    this.getDataById()
    if(this.action == 'edit'){
              this.userForm.get('email')?.removeValidators;
    }
  
  }
  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  saveDetails(){
    this.userService.addUser(this.userForm.value).subscribe((response:any)=>{
      if(response.status == 200){
        this.userdata = response['result']
        this.showNotification('snackbar-success', 'Employee added successfully!', 'top', 'center');
      }
     else{
      this.showNotification('snackbar-danger', 'Error while Adding !', 'top', 'center');
     }
    })
  }
  getDataById(){
    this.userdata = this.userService.getDataById(this.user).subscribe((res:any)=>{
      if(res.status == 200) {
        this.userdata = res['result'][0]
        if (this.user) {
          let role = this.allRoles.filter((role:any) => role.roleCode === this.userdata.role);

          this.userForm.patchValue(this.userdata);
          this.userForm.patchValue({
            role : role[0].roleCode
          })
        }
      }
       })
  }
  updateDetails(){
    this.userService.updateUserData(this.userForm.value).subscribe((res:any)=>{
          if(res.status == 200){
            this.userdata = res['result']
            this.showNotification('snackbar-success', 'Employee updated successfully!', 'top', 'center');
          }
         else{
          this.showNotification('snackbar-danger', 'Error while Adding !', 'top', 'center');
         }
    })
  }
  setSelectedDate(dateOfBirth: moment.Moment | null, dateOfJoining: any): void {
    if (dateOfBirth) {
      let formattedDate = dateOfBirth.format('YYYY-MM-DD');
      this.userForm.controls['date_of_birth'].setValue(formattedDate);
    }
    if (dateOfJoining) {
      let formattedJoiningDate = moment(dateOfJoining).format('YYYY-MM-DD');
      this.userForm.get('date_of_joining')?.setValue(formattedJoiningDate);
    }
   let errorMessage = this.utilityService.checkDateRanges(this.userForm.get('date_of_birth')?.value,this.userForm.get('date_of_joining')?.value);
   if(errorMessage == true){
    this.errMessageOfDates = 'Date of Joining Must be greater than Date of Birth';
        this.userForm.get('date_of_joining')?.setErrors(this.errMessageOfDates);
        }
        else{
    this.errMessageOfDates = '';
        this.userForm.get('date_of_joining')?.setErrors(this.errMessageOfDates);
        }
    this.userForm.get('date_of_birth')?.valueChanges.subscribe(() => {
      let errorMessage = this.utilityService.checkDateRanges(this.userForm.get('date_of_birth')?.value,this.userForm.get('date_of_joining')?.value);
      if(errorMessage == true){
  this.errMessageOfDates = 'Date of Joining Must be greater than Date of Birth';
      this.userForm.get('date_of_joining')?.setErrors(this.errMessageOfDates);
      }
      else{
  this.errMessageOfDates = '';
      this.userForm.get('date_of_joining')?.setErrors(this.errMessageOfDates);
      }
    });
  
    // Subscribe to value changes of date_of_joining control
    this.userForm.get('date_of_joining')?.valueChanges.subscribe(() => {
   let errorMessage = this.utilityService.checkDateRanges(this.userForm.get('date_of_birth')?.value,this.userForm.get('date_of_joining')?.value);
   if(errorMessage == true){
    this.errMessageOfDates = 'Date of Joining Must be greater than Date of Birth';
        this.userForm.get('date_of_joining')?.setErrors(this.errMessageOfDates);
        }
        else{
    this.errMessageOfDates = '';
        this.userForm.get('date_of_joining')?.setErrors(this.errMessageOfDates);
        }
    });
  }
  
}
