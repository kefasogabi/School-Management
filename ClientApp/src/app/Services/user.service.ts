import { User, ChangePassword, upload } from './user.model';
import { Injectable } from '@angular/core';
import { Http, RequestOptions,  Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  

  constructor(private http: Http) { }

  getAll(){
    return this.http.get('/Account/GetAll', this.jwt()).map((response: Response) => response.json());
  }
  getById(id){
    return this.http.get('/Account/GetById/' + id, this.jwt()).map((response: Response) => response.json());
  }

  update(user: User){
    return this.http.put('/Account/Update/'+ user.id, user, this.jwt());
  }

  uploadImage( photo: File){
    var formData = new FormData();
    formData.append('file', photo);

    return this.http.post('/api/upload', formData, this.jwt());
  }

  create(user: User){
    return  this.http.post('/Account/Register', user, this.jwt());
  }

  delete(id){
   return  this.http.delete('/Account/delete/' + id, this.jwt());
  }
  getUserProfile(){
    return this.http.get('/api/profile', this.jwt()).map((response: Response) => response.json());
  }

  changePassword(user:ChangePassword){
    return this.http.post('/api/changePassword', user, this.jwt());
  }
  // getPassword(){
  //   return this.http.get('/api/profile', this.jwt()).map((response: Response) => response.json());
  // }

  getAllRoles(){
    return this.http.get('/Role/GetRoles', this.jwt()).map((response: Response) => response.json());
  }

  private jwt() {
    // create authorization header with jwt token
    let token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + token.token });
        return new RequestOptions({ headers: headers });
    }
}

}
