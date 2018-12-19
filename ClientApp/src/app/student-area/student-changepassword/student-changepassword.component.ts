import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-changepassword',
  templateUrl: './student-changepassword.component.html',
  styleUrls: ['./student-changepassword.component.css']
})
export class StudentChangepasswordComponent implements OnInit {
  id: number;
  student = {};
  loading = false;
  constructor(private studentService: StudentService,
              private route: ActivatedRoute, 
              private toastr: ToastrService,
              private router: Router,
              ) {

    let token = JSON.parse(localStorage.getItem('token'));
    let id = token.id
    if (id) this.studentService.getById(id).take(1).subscribe(data => this.student = data );
   }

  ngOnInit() {
  }

  changePassword(form: NgForm){
    this.loading = true;
    this.studentService.changePassword(form.value).subscribe(data => {
      this.toastr.success('Updated Successfully', 'Password');
      this.router.navigate(['/student-profile']);
    },error => {
      if(error.status == 400)
      this.toastr.error('Uknown Error occured when processing Your Request.', 'Error');
      this.loading = false;
    });
  }

}
