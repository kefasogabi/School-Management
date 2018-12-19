import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../Services/student.service';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
student = {};
  constructor(private studentService: StudentService, private route: ActivatedRoute, private toastr: ToastrService) {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) this.studentService.getById(id).take(1).subscribe(data => this.student = data );
   }

  ngOnInit() {
  }

  update(form: NgForm){
    this.studentService.update(form.value).subscribe( data => {
      this.toastr.success('Updated Successfully', 'Student');
      console.log("Data",data);
    });
  }

}
