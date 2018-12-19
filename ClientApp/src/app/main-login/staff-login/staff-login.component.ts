import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';



@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.css']
})
export class StaffLoginComponent implements OnInit {
 model: any={};
  loading = false;

  constructor( private authenticationService: AuthenticationService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }
  login(){
    this.loading = true;
    this.authenticationService.login(this.model.email, this.model.password).subscribe((data:any) => {
      // localStorage.clear();
      localStorage.setItem('token', JSON.stringify(data));
      this.router.navigate(['/staff-profile']);
    } 
    , error => {
      this.toastr.error('Email or Password is incorrect', 'Error');
        this.loading = false;
    }
    );
  }

}
