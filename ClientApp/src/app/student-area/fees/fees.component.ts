import { Component, OnInit } from '@angular/core';
import { Stud } from '../../models/student.model';
import { Term } from '../../models/user.model';
import { StudentService } from '../../Services/student.service';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {

  terms: Term[] = [];
  student: Stud = {
   
    results:[],
    terms:[]
    
};

yea:any = "";

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getProfile().subscribe((data:any) => {
      this.student = data;
    });
  }

}
