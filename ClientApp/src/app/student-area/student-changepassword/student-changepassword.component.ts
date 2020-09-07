import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-student-changepassword',
  templateUrl: './student-changepassword.component.html',
  styleUrls: ['./student-changepassword.component.css']
})
export class StudentChangepasswordComponent implements OnInit {

  student = {};
  constructor(private studentService: StudentService,
              private route: ActivatedRoute, 
              private toastr: ToastrService,
              private router: Router,
              private spinner: NgxSpinnerService
              ) {

   }

  ngOnInit() {
  }

  changePassword(form: NgForm){
    this.spinner.show();
    this.studentService.changePassword(form.value).subscribe(data => {
      this.toastr.success('Updated Successfully', 'Password');
      this.router.navigate(['/student-profile']);
      this.spinner.hide();
    },error => {
      this.toastr.error(error);
      this.spinner.hide();
    });
  }

}
