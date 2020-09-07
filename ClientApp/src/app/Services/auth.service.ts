import { Login } from './../models/user.model';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {

  constructor( private http: HttpClient) { }

  login(login:Login) {
      return this.http.post('/Account/Login', login);
  }

    isLoggedIn(){
      return tokenNotExpired();
    }

  isAdmin(){
    let role = JSON.parse(localStorage.getItem('role'));

    if(role == "Admin") 
    return true;

    return false;
  }

  isStaff(){
    let role = JSON.parse(localStorage.getItem('role'));

    if(role == "Staff" || role == "Admin") 
    return true;

    return false;
  }

  

}