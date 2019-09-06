import { StudentService } from './../../Services/student.service';
import { Component, OnInit } from '@angular/core';
import { Stud } from '../../models/student.model';
import { Term } from '../../models/user.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  terms: Term[] = [];
  student: Stud = {
   
      results:[],
      terms:[]
      
  };
  yea:any = "";
  subjects: any[];



  constructor(private studentService: StudentService) { }

  ngOnInit() {

    this.studentService.getProfile().subscribe((data:any) => {
      this.student = data;
    });
    
  }

  onYearChange(){
    let res = this.student.results;
     this.subjects = res.filter(m => m.year == this.yea);   
  }

}
