import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
  })
  export class TimesheetService {
     user:any =[]
   //   constructor(private http: HttpClient){

   //   }
   addUser(data:any){
    this.user.push(data);
    return this.user;
   }
   getDataByName(name:any){
    // console.log('serviceName',name)
    let userData = this.user.filter((user: any) => user.name === name);
    return userData;
   }
   getAllUsers(){
    return this.user
   }
   updateUser(user: any): void {
    const index = this.user.findIndex((userData: any) => userData.name === user.name);
    console.log(index)
    if (index !== -1) {
      this.user[index] = user; 
    }
    return user
  }
  
  
   // emailExistsValidator(): AsyncValidatorFn {
   //    return (control: AbstractControl): Observable<ValidationErrors | null> => {
   //      const email = control.value;
   //      return this.http.get<any>(`YOUR_BACKEND_ENDPOINT/check-email?email=${email}`).pipe(
   //        map(response => (response.exists ? { emailExists: true } : null)),
   //        catchError(() => of(null))
   //      );
   //    };
   //  }
     emailExistsValidator(): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors | null> => {
        const email = control.value;
    const emailExists = this.user.some((user: any) => user.email === email);

    return of(emailExists ? { emailExists: true } : null);
      
      };
    }
   
  }