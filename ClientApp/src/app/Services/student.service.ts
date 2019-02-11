import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Student, changePassword } from './student.model';

@Injectable()
export class StudentService {

  constructor(private http: Http) { }


  getAll() {
    return this.http.get( '/api/students', this.jwt()).map((response: Response) => response.json());
}

getById(id) {
    return this.http.get( '/api/student/' + id, this.jwt()).map((response: Response) => response.json());
}

create(student: Student) {
    return this.http.post('/api/Register', student, this.jwt());
}

update(student: Student) {
    return this.http.put( '/api/student/' + student.id, student, this.jwt());
}

delete(id: number) {
    return this.http.delete( '/api/student/' + id, this.jwt());
}

getSex(){
    return this.http.get('/api/sex', this.jwt()).map((response: Response) => response.json());
}

getGrade(){
    return this.http.get('/api/grade', this.jwt()).map((response: Response) => response.json());
}

uploadImage(id, photo: File){
    var formData = new FormData();
    formData.append('file', photo);

    return this.http.post('/api/StudentUpload/' + id, formData, this.jwt());
  }


changePassword(student: Student){
    return this.http.put('/api/changepassword/' +  student.id, student, this.jwt());
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
