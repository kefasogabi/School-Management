import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import 'rxjs/add/operator/take';
import { StudentService } from '../../Services/student.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { ResultComponent } from '../../student-area/result/result.component';
import { ResultService } from '../../Services/result.service';
import { Student } from '../../models/student.model';
import { Term } from '../../models/user.model';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  public t = '';
  public i = 0;
  public id = "";
  terms: Term[] = [];
  model = {
    id:0,
    termId:""
  };
  average:number = 0;
  student: Student;
 yea:any = "";
  subjects: any[];
  imageUrl: string ="/img/avatar.jpg";
  @ViewChild('fileInput') fileInput: ElementRef;

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

  constructor(private studentService: StudentService,
              private route: ActivatedRoute,
              private resultService: ResultService,
              private userService: UserService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('id');
    if (id) this.studentService.getById(id).take(1).subscribe( (data:any) => {
    this.student = data;
    });

    this.userService.getTerms().subscribe((data:any) => {
      this.terms = data;

    });

  }

  onYearChange(id){
    this.spinner.show();
    this.resultService.getResults(id).subscribe((data:any) =>{
      let res:any[];
      res = data;

     let result = res.filter(m => m.year == this.yea);

     this.subjects = result.map(x => ({ id: x.id,
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
    }, error =>{
      this.toastr.error(error, 'Error');
      this.spinner.hide();
    });

  }

  getAverage(){
    let sum = 0;
    let count = 0;
    let result = 0;
    this.subjects.forEach( x => sum += x.total);


    for(let obj in this.subjects){
      count++
    }

    result = sum / count;

    return result;
  }

  setT(t) {
    this.t = t;
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


uploadPhoto(id){
  this.spinner.show();
  var nativeElemet: HTMLInputElement = this.fileInput.nativeElement;
  this.studentService.uploadImage(id, nativeElemet.files[0]).subscribe( data => {
    this.toastr.success('Image Uploaded successful', 'Success');
    this.spinner.hide();
  },
  error => {
    this.toastr.error(error);
    this.spinner.show();
  });
}

changePassword(form: NgForm){
  this.spinner.show();
  this.studentService.resetPassword(form.value).subscribe(data => {
    this.toastr.success('Updated Successfully', 'Password');
    this.spinner.hide();
  },error => {

    this.toastr.error(error, 'Error');
    this.spinner.hide();
  });
}


postResult(form: NgForm){
  this.spinner.show();
  this.resultService.postResult().subscribe( data => {
    this.toastr.success('Result Added Successfully', 'Success');
    this.clear();
    this.spinner.hide();
  },
  error => {
    this.toastr.error(error);
    this.spinner.hide();
  });
}

postTerm(body){
    this.spinner.show();
  this.resultService.create(body.value).subscribe( (data:any) => {
    this.toastr.success('Term Added successfully', 'Success');
    this.spinner.hide();
}, error => {
  this.toastr.error(error, 'Error');
  this.spinner.hide();
});
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
    this.toastr.success('Result Deleted Successfully', 'Success');
    this.spinner.hide();
  }, error =>{
    this.toastr.error(error, 'Error');
    this.spinner.hide();
  });
}






}
