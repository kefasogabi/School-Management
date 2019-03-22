import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UniversalService {

  constructor(private http: Http) { }

  getSex(){
    return this.http.get('/api/sex', this.jwt()).map((response: Response) => response.json());
}

getBloodGroup(){
  return this.http.get('/api/bloodGroup', this.jwt()).map((res:Response) => res.json());
}

getGenoType(){
  return this.http.get('/api/genoType', this.jwt()).map((res:Response) => res.json());
}

getReligion(){
  return this.http.get('/api/religion', this.jwt()).map((res:Response) => res.json());
}

getNextKin(){
  return this.http.get('/api/nextKin', this.jwt()).map((res:Response) => res.json());
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
