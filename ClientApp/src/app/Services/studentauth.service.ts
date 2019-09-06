import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/student.model';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class StudentauthService {

  constructor( private http: HttpClient) { }



  login(login: Login) {
      return this.http.post('/api/Login', login);
  }

  isLoggedIn(){
    return tokenNotExpired();
  }




}
