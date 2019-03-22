import { UniversalService } from './../../Services/universal.service';
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
  bloodGroups: any[];
  genoTypes: any[];
  religions: any[];
  nextKin: any[];

  sexId: string ="Select Sex";
  gradeId: string ="Select Class"; 

  constructor(private studentService: StudentService,
              private universalService: UniversalService,
               private toastr: ToastrService,
                private router: Router) { }

  ngOnInit() {
    this.resetForm();

    this.universalService.getSex().subscribe( sex => {
      this.sex = sex;
    });

    this.studentService.getGrade().subscribe( data => {
      this.grade = data;
    });

    this.universalService.getSex().subscribe( sex => {
      this.sex = sex;
    });

    this.universalService.getBloodGroup().subscribe( data => {
      this.bloodGroups = data;
    });

    this.universalService.getGenoType().subscribe( data => {
      this.genoTypes = data;
    });

    this.universalService.getReligion().subscribe( data => {
      this.religions = data;
    });

    this.universalService.getNextKin().subscribe(data => {
      this.nextKin = data;
    })

  }



      register(form: NgForm) {
        this.loading = true;
        this.studentService.create(form.value).subscribe((data:any) => {
                    this.resetForm(form);
                    this.toastr.success('Registration successful', 'Success');
                },
                error => {
                    if(error.status == 400)
                    this.toastr.error(error.message, 'Error');
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
      country:'',
      state: '',
      lGA:'',
      sex: {
        id: null,
        name: ""
      },
      grade: {
        id: null,
        name: ""
      },
      genoType: {
        id: null,
        name: ""
      },
      bloodGroup:{
        id:null,
        name:""
      },
      religion:{
        id:null,
        name:""
      },
      nkName:'',
      nkAddress:'',
      nkPhone:'',
      hairColor:'',
      nkRelationship:{
        id:null,
        name:""
      },
      password: '',
      }
  }

}
