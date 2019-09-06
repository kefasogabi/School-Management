import { StudentTerm, Result } from '../models/student.model';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';


@Injectable()
export class ResultService {

    constructor(private http:Http){}

 create(studentTerm: StudentTerm){
    return this.http.post('/api/PostStudentTerm', studentTerm, this.jwt());
 }

 postResult(result: Result){ 
     return this.http.post('/api/PostResult', result, this.jwt());
 }

 getStudent(name){
     return this.http.get('/api/Getstudent/' + name, this.jwt()).map((res:Response) => res.json());
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