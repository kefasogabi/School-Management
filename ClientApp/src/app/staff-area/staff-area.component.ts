import { JwtHelper } from 'angular2-jwt';
import { AuthenticationService } from './../Services/authentication.service';
import { UserService } from './../Services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-area',
  templateUrl: './staff-area.component.html',
  styleUrls: ['./staff-area.component.css']
})
export class StaffAreaComponent implements OnInit {
staff ={};
  constructor( private userService: UserService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe((data:any) => {
      this.staff = data;
    });
  
  }

  get user() {
    let token = localStorage.getItem('token');
    if(!token) return null;

    return new JwtHelper().decodeToken(token);

  }

 

}
