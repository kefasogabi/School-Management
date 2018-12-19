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
  student = {};
  constructor(private studentService: StudentService,  private route: ActivatedRoute) {

    let token = JSON.parse(localStorage.getItem('token'));
    let id = token.id
    if (id) this.studentService.getById(id).take(1).subscribe(data => this.student = data );
   }

  ngOnInit() {
    
  
  }

  // getStudentId(id){
  //   this.studentService.getById(id).subscribe((data:any) => {
  //     this.student = data;
  //     console.lo
  //   });
  // }

}
