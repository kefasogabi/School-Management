import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Services/student.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../Services/auth.service';

@Component({
  selector: 'app-student-bar',
  templateUrl: './student-bar.component.html',
  styleUrls: ['./student-bar.component.css']
})
export class StudentBarComponent implements OnInit {

  returnUrl: string;
  id: number;
  student = {};
  constructor(private studentService: StudentService, private authService:AuthenticationService,   private route: ActivatedRoute) {}

  ngOnInit() {
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

isLoggedIn(){
  let token = localStorage.getItem("token");

if(!token)
return false

  return true;
}

  

}
