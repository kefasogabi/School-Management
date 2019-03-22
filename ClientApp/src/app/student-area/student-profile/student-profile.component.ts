import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../Services/student.service';


@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  id: number;

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
  constructor(private studentService: StudentService,  private route: ActivatedRoute) {

    // let token = JSON.parse(localStorage.getItem('token'));
    // let id = token.id
    // if (id) this.studentService.getById(id).take(1).subscribe(data => this.student = data );
   }

  ngOnInit() {

    this.studentService.getProfile().subscribe((data:any) => {
      this.student = data;
    });
    
  
  }

}
