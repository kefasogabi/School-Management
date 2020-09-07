import { JwtHelper } from 'angular2-jwt';
import { UserService } from './../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Services/auth.service';

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
