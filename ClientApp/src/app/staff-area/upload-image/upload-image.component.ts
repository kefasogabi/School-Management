import { ActivatedRoute } from '@angular/router';
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
  // id:any;
  constructor(private userService: UserService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.userService.getUserProfile().subscribe((data:any) => {
      this.staff = data;
      console.log(data);
    });
  }


  upload(id){
    var nativeElemet: HTMLInputElement = this.fileInput.nativeElement;

    this.userService.uploadImage(id, nativeElemet.files[0]).subscribe((data:any) => {
      console.log(data);
    })
  }
}
