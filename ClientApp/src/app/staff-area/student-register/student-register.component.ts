import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Student } from '../../Services/student.model';
import { StudentService } from '../../Services/student.service';


@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {
  model = {};
  loading = false;
  student: Student;
  sex: any[];
  grade: any[];

  constructor(private studentService: StudentService,
               private toastr: ToastrService,
                private router: Router) { }

  ngOnInit() {
    this.resetForm();

    this.studentService.getSex().subscribe( sex => {
      this.sex = sex;
    });

    this.studentService.getGrade().subscribe( data => {
      this.grade = data;
    });

  }



      register(form: NgForm) {
        this.loading = true;
        this.studentService.create(form.value).subscribe((data:any) => {
                    this.resetForm(form);
                    this.toastr.success('Registration successful', 'Success');
                },
                error => {
                    if(error.status == 400)
                    this.toastr.error('Uknown Error occured when processing Your Request.', 'Error');
                    this.loading = false;
                  });
    }

    resetForm(form? : NgForm){
            
      if(form != null)
      form.reset();
      this.student ={
      id: null,
      firstName: '',
      lastName: '',
      userName: '',
      address: '',
      dateOfBirth: '',
      sex: {
        id: null,
        name: ""
      },
      grade: {
        id: null,
        name: ""
      },
      password: '',
      }
  }

}
