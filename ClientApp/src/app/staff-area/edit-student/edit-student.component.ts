import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../Services/student.service';
import { NgForm } from '@angular/forms';
import { EditStudent } from '../../Services/student.model';



@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
student = {
  id:0,
    firstName: "",
    lastName: "",
    userName: "",
    dateOfBirth: "",
    address: "",
    sexId: 0,
    gradeId: 0
};



  constructor(private studentService: StudentService, private route: ActivatedRoute, private toastr: ToastrService) {
    
   }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) this.studentService.getById(id).take(1).subscribe(data => this.student = data );
  }

  update(form: NgForm){
    this.studentService.update(form.value).subscribe( data => {
      this.toastr.success('Updated Successfully', 'Student');
      console.log("Data",data);
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
  }

}
