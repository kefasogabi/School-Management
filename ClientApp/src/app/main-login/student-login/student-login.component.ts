import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentauthService } from '../../Services/studentauth.service';


@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {
  model: any={};
  loading = false;


  constructor(private studentauthService: StudentauthService, private toastr: ToastrService,private router: Router) { }

  ngOnInit() {
  }


  login(){
    this.loading = true;
    this.studentauthService.login(this.model.userName, this.model.password).subscribe((data:any )=> {
      // localStorage.clear();
      localStorage.setItem('token', JSON.stringify(data));
      this.router.navigate(['/student-profile']);
    } 
    , error => {
      this.toastr.error('UserName or Password is incorrect', 'Error');
        this.loading = false;
    }
    );
  }

}
