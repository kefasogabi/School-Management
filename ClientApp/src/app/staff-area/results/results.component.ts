import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../Services/result.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../Services/user.service';
import { Term } from '../../models/user.model';
import { Student } from '../../models/student.model';
import { NgForm } from '@angular/forms';

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

  constructor(private resultService: ResultService, 
              private spinner: NgxSpinnerService, 
              private toastr: ToastrService,
              private userService: UserService
              ) { }

  ngOnInit() {
    this.userService.getTerms().subscribe(data => {
      this.terms = data;

    });
  }

getStudent(name){
  this.spinner.show();
  let id = Object.keys(name.value).map(data => { return name.value[data]});
  this.resultService.getStudent(id[0]).subscribe(data =>{
    this.student = data;
    console.log(this.student.terms);
    this.spinner.hide();
  },
  error => {
    if(error.status === 404)
    this.toastr.error("User NotFound", 'Error');
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
  this.toastr.error("Something went wrong", 'Error');
  this.spinner.hide();
});
}


postResult(form: NgForm){
  this.spinner.show();
  this.resultService.postResult(form.value).subscribe( data => {
    this.toastr.success('Result Added Successfully', 'Succes');
    this.spinner.hide();
  }, error =>{
    this.toastr.error("Something went wrong", 'Error');
  this.spinner.hide();
  });
}



}
