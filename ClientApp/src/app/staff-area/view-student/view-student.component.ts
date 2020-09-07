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
  terms: Term[] = [];
  model = {
    id:0,
    termId:""

  };
  load = false;

  student: Student ={
    id:0,
    userName:"",
    firstName:"",
    lastName:"",
    fileName:"",
    dateOfBirth:"",
    address:"",
    password:"",
    country:"",
    state:"",
    lga:"",
    hairColor:"",
    nkName:"",
    nkPhoneNumber: "",
    nkAddress:"",
    sex: {
      id: 0,
      name: ""
    },
    session: {
      id: 0,
      name: ""
    },
    grade: {
      id: 0,
      name: ""
    },
    genoType: {
      id: 0,
      name: ""
    },
    bloodGroup:{
      id:0,
      name:""
    },
    religion:{
      id:0,
      name:""
    },
    nkRelationship:{
      id:0,
      name:""
    },
    results:[],
    terms:[]
  };

 yea:any = "";
  subjects: any[];
 some:any[];

  imageUrl: string ="/img/avatar.jpg";
  @ViewChild('fileInput') fileInput: ElementRef;
  loading = false;

  constructor(private studentService: StudentService, 
              private route: ActivatedRoute, 
              private resultService: ResultService,
              private userService: UserService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) this.studentService.getById(id).take(1).subscribe( (data:any) => {
    this.student = data;
    });
    
   }

  ngOnInit() {

    this.userService.getTerms().subscribe((data:any) => {
      this.terms = data;

    });

  }

  onYearChange(){
    this.spinner.show();
    let res = this.student.results;
     this.subjects = res.filter(m => m.year == this.yea);  
     this.spinner.hide(); 
  }

  setT(t) {
    this.t = t; 
  }

  getStudent(){
    this.spinner.show();
    let id = this.route.snapshot.paramMap.get('id');
    this.studentService.getById(id).take(1).subscribe( (data:any) => {
      this.student = data;
      this.spinner.hide();
      },
      error =>{
        this.toastr.error(error);
        this.spinner.hide();
      });
  }

uploadPhoto(id){
  this.spinner.show();
  var nativeElemet: HTMLInputElement = this.fileInput.nativeElement;
  this.studentService.uploadImage(id, nativeElemet.files[0]).subscribe( data => {
    this.getStudent();
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
    this.getStudent();
    this.toastr.success('Term Added successfully', 'Success');
    this.spinner.hide();
}, error => {
  this.toastr.error(error, 'Error');
  this.spinner.hide();
}); 
}


}
