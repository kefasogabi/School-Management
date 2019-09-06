import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { StudentauthService } from '../Services/studentauth.service';


@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {
  invalidLogin = false;
  model: any={};

  constructor(private studentauthService: StudentauthService, 
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }


  login(form){
    this.spinner.show();
    this.studentauthService.login(form).subscribe((data:any )=> {
      if(data){
        localStorage.setItem('token', JSON.stringify(data.token));
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/student-profile']);
        this.spinner.hide();
      }else{
        this.invalidLogin = true;
      this.spinner.hide();
      }
    });
  }

}
