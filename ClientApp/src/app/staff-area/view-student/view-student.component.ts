import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import 'rxjs/add/operator/take';
import { StudentService } from '../../Services/student.service';




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
      sex: {
        id: 0,
        name: ""
      },
      grade: {
        id: 0,
        name: ""
      },
      term:{
        id:0,
        name:""
      },
      session:{
        id:0,
        name:""
      }
  };


  imageUrl: string ="/img/avatar.jpg";
  @ViewChild('fileInput') fileInput: ElementRef;
  loading = false;

  constructor(private studentService: StudentService, private route: ActivatedRoute, private toastr: ToastrService) {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) this.studentService.getById(id).take(1).subscribe( (data:any) => {
        
    this.student = data;
    console.log(data);
    });
    
   }

  ngOnInit() {
    
  }

  getStudent(){
    let id = this.route.snapshot.paramMap.get('id');
    this.studentService.getById(id).take(1).subscribe( (data:any) => {
        
      this.student = data;
      console.log(data);
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


}
