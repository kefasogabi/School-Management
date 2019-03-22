import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../Services/user.service';


@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.css']
})
export class StaffProfileComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  loading = false;

staff ={
  

      sex: {
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
};
  constructor(private userService: UserService, private toastr:ToastrService) { }

  ngOnInit() {
    this.loadProfile();
  }

  upload(){
    this.loading = true;
    var nativeElemet: HTMLInputElement = this.fileInput.nativeElement;
    this.userService.uploadImage(nativeElemet.files[0]).subscribe((data:any) => {
      this.loadProfile();
      this.toastr.success('Image Uploaded successful', 'Success');
    },
    error => {
      if(error)
      this.toastr.error(error);
      this.loading = false;
    });
  }

  private loadProfile(){
    this.userService.getUserProfile().subscribe((data:any) => {
      this.staff = data;
    });
  }

}
