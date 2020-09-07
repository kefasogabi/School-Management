import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) { }

getBoys(){
  return this.http.get('/api/male');
}

getGirls(){
  return this.http.get('/api/female');
}

getStudents(){
  return this.http.get('/api/allStudents');
}

getStaffs(){
  return this.http.get('/api/allStaff');
}

getGrades(){
  return this.http.get('/api/gradeCount');
}

getGradeMale(){
  return this.http.get('/api/GradeMales');
}
getGradeFemale(){
  return this.http.get('/api/GradeFemales');
}

getStaffGenders(){
  return this.http.get('/api/staffGenders');
}


  
}
