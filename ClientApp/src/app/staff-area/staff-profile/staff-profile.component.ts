import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';


@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.css']
})
export class StaffProfileComponent implements OnInit {
staff ={};
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe((data:any) => {
      this.staff = data;
    });
  }

}
