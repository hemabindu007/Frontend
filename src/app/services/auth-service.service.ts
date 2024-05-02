import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable} from 'rxjs';
import { User } from '../core/models/user';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  url = environment.apiUrl
  constructor(private http: HttpClient) { 
    console.log(this.url)
  }
  getData(): Observable<User> {
    console.log(this.url)
    return this.http.get<User>(`${this.url}/user/apiTest`);
  }
}
