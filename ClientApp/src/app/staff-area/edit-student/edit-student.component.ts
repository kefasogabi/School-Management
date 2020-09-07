import { UniversalService } from './../../Services/universal.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../Services/student.service';
import { NgForm } from '@angular/forms';
import { EditStudent, SaveStudent } from '../../models/student.model';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { error } from 'protractor';



@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
student:SaveStudent = {
  id: 0,
  firstName: "",
  lastName: "",
  userName: "",
  dateOfBirth: "",
  address: "",
  sexId :0,
  gradeId :0,
  password: "",
  country: "",
  state:"",
  lGA:"",
  genoTypeId: 0,
  bloodGroupId: 0,
  religionId: 0,
  hairColor: "",
  nKName: "",
  nKPhoneNumber: "",
  nKRelationshipId: 0,
  nKAddress: ""
};
sex: any[];
grade: any[];
bloodGroup: any[];
genoType: any[];
religion: any[];
nkRelationship: any[];

  constructor(private studentService: StudentService,
              private universalService: UniversalService,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) {
                route.params.subscribe(p => {
                  this.student.id = +p['id'] || 0;
                });
    
   }

  ngOnInit() {

     let sources = [
      this.universalService.getSex(),
      this.studentService.getGrade(),
      this.universalService.getBloodGroup(),
      this.universalService.getGenoType(),
      this.universalService.getReligion(),
      this.universalService.getNextKin(),
      this.studentService.getById(this.student.id).take(1),
  
    ];

    Observable.forkJoin(sources).subscribe((data:any) =>{
      this.sex = data[0];
      this.grade = data[1];
      this.bloodGroup = data[2];
      this.genoType = data[3];
      this.religion = data[4];
      this.nkRelationship = data[5];
      this.setStudent(data[6]);

    },
    error =>{
      this.toastr.error(error);
    });
   
   
  }

  update(form: NgForm){
    this.spinner.show();
    this.studentService.update(form.value).subscribe( data => {
      this.toastr.success('Updated Successfully', 'Student');
      this.spinner.hide();
    },
    error =>{
      this.toastr.error(error);
      this.spinner.hide();
    });
  }

  private setStudent(s: EditStudent){
    this.student.id = s.id;
    this.student.firstName = s.firstName;
    this.student.lastName = s.lastName;
    this.student.userName = s.userName;
    this.student.dateOfBirth = s.dateOfBirth;
    this.student.address = s.address;
    this.student.sexId = s.sex.id;
    this.student.gradeId = s.grade.id;
    this.student.country = s.country;
    this.student.state = s.state;
    this.student.lGA = s.lga;
    this.student.nKName = s.nkName;
    this.student.nKPhoneNumber = s.nkPhoneNumber;
    this.student.nKRelationshipId = s.nkRelationship.id;
    this.student.nKAddress = s.nkAddress;
    this.student.hairColor = s.hairColor;
    this.student.bloodGroupId = s.bloodGroup.id;
    this.student.religionId = s.religion.id;
    this.student.genoTypeId = s.genoType.id;
  }

}
