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
  
  loading = false;
  model = {};
  student: SaveStudent;
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
            this.spinner.show();
            this.studentService.create(form.value).subscribe(data => {
            this.toastr.success('Registration successful', 'Success');
            this.resetForm(form);
            this.spinner.hide();
      },
        error => {
          this.toastr.error(error._body, 'Error');
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
        lga:'',
        sexId: null,
        gradeId: null,
        genoTypeId: null,
        bloodGroupId: null,
        religionId: null,
        nkName:'',
        nkAddress:'',
        nkPhoneNumber:'',
        hairColor:'',
        nkRelationshipId: null,
        password: '',
        }
  }

}
