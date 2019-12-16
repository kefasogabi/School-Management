import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '../Services/authentication.service';



@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.css']
})
export class StaffLoginComponent implements OnInit {
 model: any={};
  invalidLogin = false;

  constructor( private authenticationService: AuthenticationService, 
                private router: Router,
                private route: ActivatedRoute,
                private toastr: ToastrService,
                private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }
  login(form){
    this.spinner.show();
    this.authenticationService.login(form).subscribe((data:any) => {
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('role', JSON.stringify(data.role));
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/staff/dashboard']);
        this.spinner.hide();
    }, error => {
      this.invalidLogin = true;
      this.spinner.hide();
    });
  }

}
