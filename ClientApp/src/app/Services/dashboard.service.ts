import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class DashboardService {

  constructor(private http: Http) { }

getBoys(){
  return this.http.get('/api/male', this.jwt()).map((res:Response)=> res.json());
}

getGirls(){
  return this.http.get('/api/female', this.jwt()).map((res:Response)=> res.json());
}

getStudents(){
  return this.http.get('/api/allStudents', this.jwt()).map((res:Response)=> res.json());
}

getStaffs(){
  return this.http.get('/api/allStaff', this.jwt()).map((res:Response)=> res.json());
}

getGrades(){
  return this.http.get('/api/gradeCount', this.jwt()).map((res:Response)=> res.json());
}

getGradeMale(){
  return this.http.get('/api/GradeMales', this.jwt()).map((res:Response) => res.json());
}
getGradeFemale(){
  return this.http.get('/api/GradeFemales', this.jwt()).map((res:Response) => res.json());
}

getStaffGenders(){
  return this.http.get('/api/staffGenders', this.jwt()).map((res:Response)=> res.json());
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
