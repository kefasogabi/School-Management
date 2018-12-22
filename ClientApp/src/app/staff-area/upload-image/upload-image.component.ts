import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../Services/user.service';


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  staff = {};
  loading = false;
  imageUrl: string ="/img/avatar.jpg";
  fileToUpload: File = null;

  constructor(private userService: UserService,
              private route:ActivatedRoute, 
              private toastr: ToastrService,
              private router:Router
              ) {}

  ngOnInit() {
  }

  handleFileInput(file: FileList){
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }


  upload(){
    this.loading = true;
    var nativeElemet: HTMLInputElement = this.fileInput.nativeElement;

    this.userService.uploadImage(nativeElemet.files[0]).subscribe((data:any) => {
      console.log(data);
      this.toastr.success('Image Uploaded successful', 'Success');
      this.router.navigate(['/staff-profile']);
    },
    error => {
      if(error)
      this.toastr.error(error);
      this.loading = false;
    });
  }
}
