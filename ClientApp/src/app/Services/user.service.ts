import { Injectable } from '@angular/core';
import { Http, RequestOptions,  Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { User, Session, Term, ChangePassword } from '../models/user.model';

@Injectable()
export class UserService {
  
  selectedSession: Session;
  sessionList: Session[];

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

  uploadimage(id, photo: File){
    var formData = new FormData();
    formData.append('file', photo);

    return this.http.post('/api/staffUpload/' + id, formData, this.jwt());
  }

  create(user: User){
    return this.http.post('/Account/Register', user, this.jwt());
  }

  delete(id){
   return  this.http.delete('/Account/delete/' + id, this.jwt());
  }
  getUserProfile(){
    return this.http.get('/api/profile', this.jwt()).map((response: Response) => response.json());
  }

  postSession(session: Session){
    return this.http.post('/api/postSession', session, this.jwt());
  }

  getSessions(){
    return this.http.get('/api/sessions', this.jwt()).map((res: Response) => res.json());
  }
  getSession(id){
    return this.http.get('/api/getSession/' + id, this.jwt()).map((response: Response) => response.json());
  }
  deleteSession(id){
    return this.http.delete('/api/deleteSession/' + id, this.jwt());
  }
  updateSession(session: Session){
    return this.http.put('/api/updateSession/' + session.id, session, this.jwt());
  }
  postTerm(term: Term){
    return this.http.post('/api/postTerm', term, this.jwt());
  }
  getTerms(){
    return this.http.get('/api/terms', this.jwt()).map((res: Response) => res.json());
  }
  getTerm(id){
    return this.http.get('/api/term/' + id, this.jwt()).map((response: Response) => response.json());
  }

  updateTerm(term: Term){
    return this.http.put('/api/updateTerm/' + term.id, term, this.jwt());
  }

  deleteTerm(id){
    return this.http.delete('/api/deleteTerm/' + id, this.jwt());
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
        let headers = new Headers({ 'Authorization': 'Bearer ' + token});
        return new RequestOptions({ headers: headers });
    }
}

}
