import { ToastrService } from 'ngx-toastr';

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { UserService } from '../../Services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.css']
})
export class ViewStaffComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;

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
  constructor(private userService: UserService, 
              private route: ActivatedRoute, 
              private toastr:ToastrService,
              private spinner: NgxSpinnerService,) {

    let id = this.route.snapshot.paramMap.get('id');
    if (id) this.userService.getById(id).take(1).subscribe((data:any) => this.staff = data );
    
   }

  ngOnInit() {
  }

  getStaff(){
    let id = this.route.snapshot.paramMap.get('id');
    this.userService.getById(id).take(1).subscribe( (data:any) => {
      this.staff = data;
      });
  }

  uploadPhoto(id){
    this.spinner.show();
    var nativeElemet: HTMLInputElement = this.fileInput.nativeElement;
    this.userService.uploadimage(id, nativeElemet.files[0]).subscribe((data:any) => {
      this.getStaff(); 
      this.toastr.success('Image Uploaded successful', 'Success');
      this.spinner.hide();
    },
    error => {
      this.toastr.error(error);
      this.spinner.hide();
    });
  }

}
