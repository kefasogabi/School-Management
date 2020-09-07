import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UniversalService {

  constructor(private http: HttpClient) { }

  getSex(){
    return this.http.get('/api/sex');
}

getBloodGroup(){
  return this.http.get('/api/bloodGroup');
}

getGenoType(){
  return this.http.get('/api/genoType');
}

getReligion(){
  return this.http.get('/api/religion');
}

getNextKin(){
  return this.http.get('/api/nextKin');
}



}
