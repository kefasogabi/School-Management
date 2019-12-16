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

 getResult(id){
     return this.http.get('/api/getresult/' + id, this.jwt()).map(res => res.json());
 }

 getStudent(name){
     return this.http.get('/api/Getstudent/' + name, this.jwt()).map(res => res.json());
 }

 updateReault(result: Result){
     return this.http.put('/api/updateresult/' + result.id, result, this.jwt()).map(res => res.json());
 }

 deleteResult(id){
     return this.http.delete('/api/deleteresult/' + id, this.jwt()).map(res => res.json());
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