import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  Observable, catchError, throwError,map} from 'rxjs';
import { User } from '../core/models/user';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl
  constructor(private http: HttpClient) {
  }
  getData(): Observable<User> {
    return this.http.get<User>(`${this.url}/user/apiTest`);
  }
  getAllUsers(): Observable<User> {
    return this.http.get<User>(`${this.url}/user/allUsers`);
  }
  addUser(user:any): Observable<User> {
    return this.http.post<User>(`${this.url}/user/addUser`, user).pipe(
      map((response:any) => {
        return response; 
      }),
      catchError(this.handleError)
    );
  }
  getDataById(id:any){
    return this.http.get(`${this.url}/user/byId/`+id).pipe(
      map((response:any) => {
        return response; 
      }),
      catchError(this.handleError)
    );
  }
   updateUserData(user:any){
    return this.http.put(`${this.url}/user/updateUser/`+user._id ,user).pipe(
      map((response:any) => {
        return response; 
      }),
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
    } else {
    }
    return throwError('Something bad happened; please try again later.');
  }
}
