import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../Services/student.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  returnUrl: string;
  id: number;
  student = {};
  constructor(private studentService: StudentService,  private route: ActivatedRoute) {

    // let token = JSON.parse(localStorage.getItem('token'));
    // let id = token.id
    // if (id) this.studentService.getById(id).take(1).subscribe(data => this.student = data );
   }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

isLoggedIn(){
  // let jwtHelper = new JwtHelper();
  let token = localStorage.getItem("token");

if(!token)
return false

  return true;
}

  ngOnInit() {
  }

}
