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
import { b1 } from '@angular/core/src/render3';

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
  yearId:any = "Select Term";
  uname:any = "";
  subjects: any[];
  average:number = 0;
  obj ={
    sum: 0
  };
  sum:any[] = [];
  total:any;
  public i = 0;
  public id = "";
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
              private studentService: StudentService,
              
              ) { }

  ngOnInit() {
    this.userService.getTerms().subscribe((data:any) => {
      this.terms = data;

    });
  }

  addResult(form:NgForm){
   
    if(this.i){ 
      this.resultService.res.splice(this.i, 1, form.value);
      this.i = 0;
      this.resetForm();
    }else{
      this.resultService.res.unshift(form.value);
      this.resetForm();
    }
  
  }


  getIndex(i){
    this.i = i;
    this.result = this.resultService.res[i];
    this.resultService.res.splice(i,1);
  }

  clear(){
    this.resultService.res.splice(0, this.resultService.res.length);
  }

  deleteResults(i){
    this.resultService.res.splice(i, 1);
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
  this.resultService.getStudent(this.uname).subscribe((data:any) =>{
    this.student = data;
    this.spinner.hide();
  },
  error => {
    this.toastr.error(error, 'Error');
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
  this.toastr.error(error, 'Error');
  this.spinner.hide();
});
}

onYearChange(){
  this.spinner.show();
  let res = this.student.results.filter(m => m.year == this.yearId); 

   this.subjects = res.map(x => ({ id: x.id,
                                     name: x.name,
                                     ass1: parseInt(x.ass1),
                                     ass2: parseInt(x.ass2),
                                     cA1: parseInt(x.cA1), 
                                     cA2: parseInt(x.cA2),
                                     exam: parseInt(x.exam),
                                     year: x.year, 
                                     studentId: x.studentId,
                                     total: parseInt(x.ass1) + parseInt(x.ass2) + parseInt(x.cA1) + parseInt(x.cA2) + parseInt(x.exam) }));

     this.average = this.getAverage(); 
   this.spinner.hide(); 
}

getAverage(){
  let sum = 0;
  let count = 0;
  let result = 0
  this.subjects.forEach( x => sum += x.total);

 
  for(let obj in this.subjects){
    count++
  }

  result = sum / count;
  
  return result;
}

postResult(){
  this.spinner.show();
  this.resultService.postResult().subscribe( data => {
    this.toastr.success('Result Added Successfully', 'Success');
    this.clear();
    this.spinner.hide();
  }), error =>{
    this.toastr.error(error, 'Error');
    this.spinner.hide();
  }
}

updateResult(form:NgForm){
  this.spinner.show();
    this.resultService.updateResult(form.value).subscribe(data => {
    this.toastr.success('Result Updated Successfully', 'Success');
    this.spinner.hide();
    });
}

editResults(id){

  this.resultService.getResult(id).subscribe(data => {
    this.Eresult = data;

  });
}

setId(id){
  this.id = id;
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
    this.toastr.error(error, 'Error');
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
    this.toastr.error(error, 'Error');
    this.spinner.hide();
  });
}



}
