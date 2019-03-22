import { UserService } from './../Services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-area',
  templateUrl: './staff-area.component.html',
  styleUrls: ['./staff-area.component.css']
})
export class StaffAreaComponent implements OnInit {
staff ={};
  constructor( private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe((data:any) => {
      this.staff = data;
    });
  
  }

 

}
