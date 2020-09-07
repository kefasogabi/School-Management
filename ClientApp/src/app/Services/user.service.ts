import { HttpClient } from '@angular/common/http';
import { KeyValuePair } from './../models/student.model';
import { Injectable } from '@angular/core';
import { Http, RequestOptions,  Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { User, Session, Term, ChangePassword } from '../models/user.model';

@Injectable()
export class UserService {
  
  selectedSession: Session;
  sessionList: Session[];

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get('/Account/GetAll');
  }
  getById(id){
    return this.http.get('/Account/GetById/' + id);
  }

  update(user: User){
    return this.http.put('/Account/Update/'+ user.id, user);
  }

  uploadImage( photo: File){
    let formData = new FormData();
    formData.append('file', photo);
    return this.http.post('/api/upload', formData);
  }

  uploadimage(id, photo: File){
    let formData = new FormData();
    formData.append('file', photo);
    return this.http.post('/api/staffUpload/' + id, formData);
  }

  create(user: User){
    return this.http.post('/Account/Register', user);
  }

  delete(id){
   return  this.http.delete('/Account/delete/' + id);
  }
  getUserProfile(){
    return this.http.get('/api/profile');
  }

  postSession(session: Session){
    return this.http.post('/api/postSession', session);
  }

  getSessions(){
    return this.http.get('/api/sessions');
  }
  getSession(id){
    return this.http.get('/api/getSession/' + id);
  }
  deleteSession(id){
    return this.http.delete('/api/deleteSession/' + id);
  }
  updateSession(session: Session){
    return this.http.put('/api/updateSession/' + session.id, session);
  }
  postTerm(term: Term){
    return this.http.post('/api/postTerm', term);
  }
  getTerms(){
    return this.http.get('/api/terms');
  }
  getTerm(id){
    return this.http.get('/api/term/' + id);
  }

  updateTerm(term: Term){
    return this.http.put('/api/updateTerm/' + term.id, term);
  }

  deleteTerm(id){
    return this.http.delete('/api/deleteTerm/' + id);
  }


  changePassword(user:ChangePassword){
    return this.http.post('/api/changePassword', user);
  }


  getAllRoles(){
    return this.http.get('/api/GetRoles');
  }

  getRole(id){
    return this.http.get('/api/GetRole/' + id);
  }

  postRole(role: KeyValuePair){
    return this.http.post('/api/PostRole', role);
  }

  updateRole(role: KeyValuePair){
    return this.http.put('/api/updateRole/' + role.id, role);
  }

  deleteRole(id){
    return this.http.delete('/api/DeleteRole/' + id);
  }



}
