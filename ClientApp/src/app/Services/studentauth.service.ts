import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StudentauthService {

  constructor( private http: HttpClient) { }



  login(userName: string, password: string) {
    var body ={
      userName: userName,
       password: password
    }
   
      return this.http.post('/api/Login', body);
  }




}
