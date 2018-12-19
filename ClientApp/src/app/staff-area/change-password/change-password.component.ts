import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../Services/user.service';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
staff: any ={};
loading = false;
  constructor(private userService: UserService,
              private router: Router, 
              private toastr: ToastrService,
              private route: ActivatedRoute
              
              ) {}

  ngOnInit() {
    // this.userService.getPassword().subscribe((data: any) => {
    //   this.staff = data;
    //   console.log("User", data)
    // })
  }

  submit(form: NgForm){
    this.loading = true;
    this.userService.changePassword(form.value).subscribe( (data:any) => {
      this.toastr.success('Password Succesfully changed', 'Success');
                this.router.navigate(['/staff-profile']);
    },
    error => {
        if(error.status == 400)
        this.toastr.error('Uknown Error occured when processing Your Request.', 'Error');
        this.loading = false;
      })
  }

}
