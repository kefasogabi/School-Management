import { UserService } from './../../Services/user.service';
import { UniversalService } from './../../Services/universal.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Student, SaveStudent } from '../../models/student.model';
import { StudentService } from '../../Services/student.service';
import { Term } from '../../models/user.model';
import { Observable } from 'rxjs';
import { AlertService } from '../../Services/alert.service';



@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {
  model = {};
  loading = false;
  student: SaveStudent;
  sex: any[];
  grade: any[];
  bloodGroups: any[];
  genoTypes: any[];
  religions: any[];
  nextKin: any[];
  terms: Term[] = [];

  sexId: string ="Select Sex";
  gradeId: string ="Select Class"; 

  constructor(private studentService: StudentService,
              private alertService: AlertService,
              private universalService: UniversalService,
              private userService: UserService,
               private toastr: ToastrService,
                private router: Router) { }

  ngOnInit() {
    this.resetForm();

    let sources = [
      this.universalService.getSex(),
      this.studentService.getGrade(),
      this.universalService.getBloodGroup(),
      this.universalService.getGenoType(),
      this.universalService.getReligion(),
      this.universalService.getNextKin(),
      this.userService.getTerms()
    ];

    Observable.forkJoin(sources).subscribe(data =>{
      this.sex = data[0];
      this.grade = data[1];
      this.bloodGroups = data[2];
      this.genoTypes = data[3];
      this.religions = data[4];
      this.nextKin = data[5];
      this.terms = data[6];
    });

  }



      register(form: NgForm) {
        this.studentService.create(form.value).subscribe((data:any) => {
                    this.resetForm(form);
                    this.toastr.success('Registration successful', 'Success');
                },
                error => {
                    this.toastr.error(error._body, 'Error');
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
