
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { User, saveUser, EditUser } from '../../models/user.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { UniversalService } from '../../Services/universal.service';




@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.css']
})
export class EditStaffComponent implements OnInit {
  staff: saveUser ={
    id:0,
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    address: "",
    sexId: null ,
    role: "",
    password:"",
    country:"",
    state:"",
    lga:"",
    genoTypeId: null,
    bloodGroupId: null,
    religionId: null,
    hairColor:"",
    nkName:"",
    nkPhoneNumber:"",
    nkRelationshipId: null,
    nkAddress:"",
  };

  sex: any[];
  bloodGroup: any[];
  genoType: any[];
  religion: any[];
  nkRelationship: any[];
  roles : any[];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private universalService: UniversalService,
    private toastr: ToastrService) {

      
   }

  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('id');

    let sources = [
      this.universalService.getSex(),
      this.universalService.getBloodGroup(),
      this.universalService.getGenoType(),
      this.universalService.getReligion(),
      this.universalService.getNextKin(),
      this.userService.getById(id).take(1),
  
    ];

    Observable.forkJoin(sources).subscribe( (data:any) =>{
      this.sex = data[0];
      this.bloodGroup = data[1];
      this.genoType = data[2];
      this.religion = data[3];
      this.nkRelationship = data[4];
      this.setStaff(data[5]);

    }, 
    error => {
      this.toastr.error(error);
    });

    this.userService.getAllRoles().subscribe(
      (data: any) => {
          data.forEach(obj => obj.seletcted = false);
          this.roles = data;
      }
    );


  }

  update(form: NgForm){
    this.spinner.show();
    this.userService.update(form.value).subscribe( data => {
      this.toastr.success('Updated Successfully', 'User');
      this.spinner.hide();
    }, 
    error => {
      this.toastr.error(error);
      this.spinner.hide();
    });
  }

  private setStaff(s: EditUser){
    this.staff.id = s.id;
    this.staff.firstName = s.firstName;
    this.staff.lastName = s.lastName;
    this.staff.email = s.email;
    this.staff.dateOfBirth = s.dateOfBirth;
    this.staff.address = s.address;
    this.staff.sexId = s.sex.id;
    // this.staff.role = s.role;
    this.staff.country = s.country;
    this.staff.state = s.state;
    this.staff.lga = s.lga;
    this.staff.nkName = s.nkName;
    this.staff.nkPhoneNumber = s.nkPhoneNumber;
    this.staff.nkRelationshipId = s.nkRelationship.id;
    this.staff.nkAddress = s.nkAddress;
    this.staff.hairColor = s.hairColor;
    this.staff.bloodGroupId = s.bloodGroup.id;
    this.staff.religionId = s.religion.id;
    this.staff.genoTypeId = s.genoType.id;
  }

   

}
