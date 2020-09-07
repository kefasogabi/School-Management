import { Observable } from 'rxjs';
import { UniversalService } from './../../Services/universal.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { User, saveUser } from '../../models/user.model';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-staff-register',
  templateUrl: './staff-register.component.html',
  styleUrls: ['./staff-register.component.css']
})
export class StaffRegisterComponent implements OnInit {


  model = { };
 
  loading = false;
  roles : any[];
  user: saveUser;
  sex: any[];
  bloodGroups: any[];
  genoTypes: any[];
  religions: any[];
  nextKin: any[];


  constructor( private userService: UserService,
               private universalService: UniversalService,
               private router: Router,
               private spinner: NgxSpinnerService,
               private toastr: ToastrService) { }

  ngOnInit() {
    
let sources = [
      this.universalService.getSex(),
      this.universalService.getBloodGroup(),
      this.universalService.getGenoType(),
      this.universalService.getReligion(),
      this.universalService.getNextKin()
];

    Observable.forkJoin(sources).subscribe( (data:any) => {
      this.sex = data[0];
      this.bloodGroups = data[1];
      this.genoTypes = data[2];
      this.religions = data[3];
      this.nextKin = data[4];
    }, err => {
      if(err.status == 404)
      this.toastr.error('Not Found', 'Error');
    });


      this.userService.getAllRoles().subscribe(
        (data: any) => {
            data.forEach(obj => obj.seletcted = false);
            this.roles = data;
        }
      );
  }

  register(form: NgForm) {
        this.spinner.show();
        this.userService.create(form.value).subscribe((data:any) => {
        this.resetForm(form);
        this.toastr.success('Registration successful', 'Success');
        this.spinner.hide();
        },
        error => {
            this.toastr.error(error, 'Error'); 
            this.spinner.hide();
        });
}


      resetForm(form? : NgForm){
        if(form != null)
        form.reset();
        this.user = {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        dateOfBirth: '',
        role: '',
        country:'',
        state: '',
        lga:'',
        sexId: null,
        genoTypeId: null,
        bloodGroupId: null,
        religionId: null,
        nkName:'',
        nkAddress:'',
        nkPhoneNumber:'',
        hairColor:'',
        nkRelationshipId: null,
        password: '',
        }
      }

}
