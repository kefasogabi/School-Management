import { Subject } from 'rxjs';
import { Result } from './../../models/student.model';
import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../Services/result.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../Services/user.service';
import { Term } from '../../models/user.model';
import { Student } from '../../models/student.model';
import { NgForm } from '@angular/forms';
import { StudentService } from '../../Services/student.service';
import { b } from '@angular/core/src/render3';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  student: Student;
  terms: Term[] = [];
  model = {
    termId:""
  };
  yea:any = "";
  uname:any = "";
  subjects: any[];
  // public id = '';
  res: any[] = [];
  total:any;
  result:any = {
    id: 0,
      name: "",
      ass1: "",
      ass2: "",
      cA1: "",
      cA2: "",
      exam: "",
      year: "",
      studentId: 0
  };

  Eresult:any = {
    id: 0,
      name: "",
      ass1: "",
      ass2: "",
      cA1: "",
      cA2: "",
      exam: "",
      year: "",
      studentId: 0
  };

  constructor(private resultService: ResultService, 
              private spinner: NgxSpinnerService, 
              private toastr: ToastrService,
              private userService: UserService,
              private studentService: StudentService
              ) { }

  ngOnInit() {
    this.userService.getTerms().subscribe(data => {
      this.terms = data;

    });
  }

  addResult(form){
   this.res.unshift(form.value);
   this.resetForm();
  }

  // editResult(i){
  //   this.result = this.res[i];
  // }
  // private setIndex(i){
  //   this.id = i;
  // }

  deleteResults(i){
    this.res.splice(i, 1);
  }

  resetForm(){
    this.result= {
      id: 0,
      name: "",
      ass1: "",
      ass2: "",
      cA1: "",
      cA2: "",
      exam: "",
    };
  }

getStudent(){
  this.spinner.show();
  this.resultService.getStudent(this.uname).subscribe(data =>{
    this.student = data;
    this.spinner.hide();
  },
  error => {
    if(error.status === 404)
    this.toastr.error(error._body, 'Error');
    this.spinner.hide();
  });
}

postTerm(body){
  this.spinner.show();
  this.resultService.create(body.value).subscribe( (data:any) => {
    // this.getStudent();
    this.toastr.success('Term Added successfully', 'Success');
    this.spinner.hide();
}, error => {
  this.toastr.error(error._body, 'Error');
  this.spinner.hide();
});
}

onYearChange(){
  let res = this.student.results;
   this.subjects = res.filter(m => m.year == this.yea);
}



postResult(form: NgForm){
  if(form.value.id != null){
    this.spinner.show();
    this.resultService.updateReault(form.value).subscribe(data => {
    this.toastr.success('Result Updated Successfully', 'Success');
    this.spinner.hide();
    });
  }else{
  this.spinner.show();
  this.resultService.postResult(form.value).subscribe( data => {
    this.toastr.success('Result Added Successfully', 'Success');
    this.spinner.hide();
  }, error =>{
    this.toastr.error(error._body, 'Error');
  this.spinner.hide();
  });
  }
}

editResults(id){

  this.resultService.getResult(id).subscribe(data => {
    this.Eresult = data;

    console.log(this.Eresult);
  });
}

deleteResult(id){
  this.spinner.show();
  this.resultService.deleteResult(id).subscribe(()=> {
    this.subjects.splice(id, 1);
    this.toastr.success('Result Deleted Successfully', 'Success');
    this.getStudent();
    this.onYearChange();
    this.spinner.hide();
  }, error =>{
    this.toastr.error(error._body, 'Error');
    this.spinner.hide();
  });
}


changePassword(form: NgForm){
  this.spinner.show();
  this.studentService.changePassword(form.value).subscribe(data => {
    this.toastr.success('Updated Successfully', 'Password');
    this.spinner.hide();
  },error => {
    if(error.status == 400)
    this.toastr.error(error._body, 'Error');
    this.spinner.hide();
  });
}



}
