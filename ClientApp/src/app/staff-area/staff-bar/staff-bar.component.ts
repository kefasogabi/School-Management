import { UserService } from './../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-staff-bar',
  templateUrl: './staff-bar.component.html',
  styleUrls: ['./staff-bar.component.css']
})
export class StaffBarComponent implements OnInit {

  returnUrl: string;
  id: number;
  staff = {};
  constructor( private route: ActivatedRoute, private userService: UserService) {}

   ngOnInit() {
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

isLoggedIn(){
  let token = localStorage.getItem("token");

if(!token)
return false

  return true;
}

 

}
