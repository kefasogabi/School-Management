import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../Services/student.service';

@Component({
  selector: 'app-student-area',
  templateUrl: './student-area.component.html',
  styleUrls: ['./student-area.component.css']
})
export class StudentAreaComponent implements OnInit {
  id: number;
  student = {};
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
