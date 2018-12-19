import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  constructor( private http: HttpClient) { }

  login(email: string, password: string) {
    var body ={
      email: email,
       password: password
    }
   
      return this.http.post('/Account/Login', body);
  }

  

}
