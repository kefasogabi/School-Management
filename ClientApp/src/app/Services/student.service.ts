import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Student, changePassword, SaveStudent } from '../models/student.model';

@Injectable()
export class StudentService {

  constructor(private http: HttpClient) { }


  getAll() {
    return this.http.get( '/api/students');
}

getById(id) {
    return this.http.get( '/api/student/' + id);
}

create(student: SaveStudent) {
    return this.http.post('/api/Register/', student);
}

update(student: Student) {
    return this.http.put( '/api/student/' + student.id, student);
}

delete(id: number) {
    return this.http.delete( '/api/student/' + id);
}

getProfile(){
    return this.http.get('/api/studentProfile');
  }


getGrade(){
    return this.http.get('/api/grade');
}

uploadImage(id, photo: File){
    var formData = new FormData();
    formData.append('file', photo);

    return this.http.post('/api/StudentUpload/' + id, formData);
  }


changePassword(student: Student){
    return this.http.put('/api/changepassword/', student);
}
resetPassword(student: Student){
    return this.http.put('/api/resetPassword/' +  student.id, student);
}

 
}
