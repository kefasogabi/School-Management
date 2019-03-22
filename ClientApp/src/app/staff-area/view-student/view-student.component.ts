import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import 'rxjs/add/operator/take';
import { StudentService } from '../../Services/student.service';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  student = {
    id:0,
      firstName: "",
      lastName: "",
      userName: "",
      dateOfBirth: "",
      address: "",
      fileName:"",
      country:"",
      state: "",
      lGA:"",
      nkName:"",
      nkAddress:"",
      nkPhone:"",
      hairColor:"",
      sex: {
        id: 0,
        name: ""
      },
      grade: {
        id: 0,
        name: ""
      },
      session:{
        id:0,
        name:""
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
  };


  imageUrl: string ="/img/avatar.jpg";
  @ViewChild('fileInput') fileInput: ElementRef;
  loading = false;

  constructor(private studentService: StudentService, private route: ActivatedRoute, private toastr: ToastrService) {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) this.studentService.getById(id).take(1).subscribe( (data:any) => {
    this.student = data;
    });
    
   }

  ngOnInit() {
    
  }

  getStudent(){
    let id = this.route.snapshot.paramMap.get('id');
    this.studentService.getById(id).take(1).subscribe( (data:any) => {
      this.student = data;
      });
  }

uploadPhoto(id){
  this.loading = true;
  var nativeElemet: HTMLInputElement = this.fileInput.nativeElement;
  this.studentService.uploadImage(id, nativeElemet.files[0]).subscribe( data => {
    this.getStudent();
    this.toastr.success('Image Uploaded successful', 'Success');
  });
}

changePassword(form: NgForm){
  this.loading = true;
  this.studentService.changePassword(form.value).subscribe(data => {
    this.toastr.success('Updated Successfully', 'Password');
    this.loading = false;
  },error => {
    if(error.status == 400)
    this.toastr.error('Uknown Error occured when processing Your Request.', 'Error');
    this.loading = false;
  });
}


}
