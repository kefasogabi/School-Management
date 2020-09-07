import { HttpClient } from '@angular/common/http';
import { StudentTerm, Result } from '../models/student.model';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';


@Injectable()
export class ResultService {

 res: any[] = [];
    constructor(private http:HttpClient){}

 create(studentTerm: StudentTerm){
    return this.http.post('/api/PostStudentTerm', studentTerm);
 }

 postResult(){ 
     let data = JSON.stringify(this.res);
     return this.http.post('/api/PostResult', data);
 }

 getResult(id){
     return this.http.get('/api/getresult/' + id);
 }

 getStudent(name){
     return this.http.get('/api/Getstudent/' + name);
 }

 updateResult(result: Result){
     return this.http.put('/api/updateresult/' + result.id, result);
 }

 deleteResult(id){
     return this.http.delete('/api/deleteresult/' + id);
 }



}