
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataTableDirective } from 'angular-datatables';
import { StudentService } from '../../Services/student.service';



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

    dtOptions: DataTables.Settings = {};
   dtTrigger: Subject<any> = new Subject();
  // students : Student[] = [];
  // grades: Grade[] = [];
  school: any = {}
   grade:any = 0;
 p: number = 1;
  students: any[];
  grades: any[];
  constructor(private studentService: StudentService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    
     this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
      
    };



    this.spinner.show();
    // this.loadAllStudent();
    this.studentService.getGrade().subscribe( grades => {
      this.grades = grades;
    });

   
      this.spinner.hide();

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

 


  onGradeChange(){
  
    var selectedGrade = this.grades.find(m => m.id == this.grade);
    this.students = selectedGrade ? selectedGrade.students  : [];
   
    
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });

  }

  delete(id){
    this.studentService.delete(id).subscribe(() => {
      this.students.splice(id, 1);
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    });
  }

 

}

