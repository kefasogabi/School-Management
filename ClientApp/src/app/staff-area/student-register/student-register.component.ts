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
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {
  

  model = { };
  student: SaveStudent = {
    id: 0,
    firstName: "",
    lastName: "",
    userName: "",
    dateOfBirth: "",
    address: "",
    sexId :0,
    gradeId :0,
    password: "",
    country: "",
    state:"",
    lGA:"",
    genoTypeId: 0,
    bloodGroupId: 0,
    religionId: 0,
    hairColor: "",
    nKName: "",
    nKPhoneNumber: "",
    nKRelationshipId: 0,
    nKAddress: ""
  
  };
  sex: any[];
  grade: any[];
  bloodGroups: any[];
  genoTypes: any[];
  religions: any[];
  nextKin: any[];
  terms: Term[] = [];


  constructor(private studentService: StudentService,
              private universalService: UniversalService,
              private userService: UserService,
               private toastr: ToastrService,
               private spinner: NgxSpinnerService,
                private router: Router) { }

  ngOnInit() {

    let sources = [
      this.universalService.getSex(),
      this.studentService.getGrade(),
      this.universalService.getBloodGroup(),
      this.universalService.getGenoType(),
      this.universalService.getReligion(),
      this.universalService.getNextKin(),
      this.userService.getTerms()
    ];

    Observable.forkJoin(sources).subscribe((data:any) =>{
      this.sex = data[0];
      this.grade = data[1];
      this.bloodGroups = data[2];
      this.genoTypes = data[3];
      this.religions = data[4];
      this.nextKin = data[5];
      this.terms = data[6];
    });

  }



      register() {
            this.spinner.show();
            this.studentService.create(this.student).subscribe((data:any) => {
            this.toastr.success('Registration successful', 'Success');
            this.spinner.hide();
      },
        error => {
          this.toastr.error(error, 'Error');
          this.spinner.hide();
      });
    }

      resetForm(form? : NgForm){
        if(form != null)
        form.reset();
        this.student = {
        id: 0,
        firstName: '',
        lastName: '',
        userName: '',
        address: '',
        dateOfBirth: '',
        country:'',
        state: '',
        lGA:'',
        sexId: null,
        gradeId: null,
        genoTypeId: null,
        bloodGroupId: null,
        religionId: null,
        nKName:'',
        nKAddress:'',
        nKPhoneNumber:'',
        hairColor:'',
        nKRelationshipId: null,
        password: '',
        }
  }

}
