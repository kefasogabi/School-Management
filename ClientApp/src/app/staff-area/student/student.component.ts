import { AuthenticationService } from './../../Services/auth.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataTableDirective } from 'angular-datatables';
import { StudentService } from '../../Services/student.service';
import * as xlsx from 'xlsx';
import { Student } from '../../models/student.model';




@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  @ViewChild('studentTable', { read: ElementRef }) studentTable: ElementRef;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  grade:any = 0;
  students: Student[];
  grades: any[];
  allStudents: any[];
  filter:any = {};
  public id = '';
  constructor(private studentService: StudentService,
              private authService:AuthenticationService, 
              private spinner: NgxSpinnerService ) { }

  ngOnInit() {
    
     this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
      
    };
    this.loadAllStudents();

    

   
    this.studentService.getGrade().subscribe( (grades:any) => {
      this.grades = grades;
    });
      

  }

  setId(id) {
    this.id = id
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }




 onGradeChange(){
   var students = this.allStudents;
  
   var selectedGrade = this.grades.find(m => m.id == this.filter.gradeId);
    students = selectedGrade ? selectedGrade.students  : students;
   
    this.students = students;

    
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
    this.loadAllStudents();
    });
  }

  private loadAllStudents(){
    this.studentService.getAll().subscribe((data:any) =>{
      this.students = this.allStudents = data;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
      
  });

}

exportToExcel() {

  let dataToExport = this.students.map(x => ({
    FullName: x.firstName + ' ' + x.lastName,
    Username: x.userName,
    Class: x.grade.name,
    Date_of_Birth: x.dateOfBirth,
    Sex: x.sex.name,
    LGA: x.lga,
    State: x.state,
    Country: x.country,
    Blood_Group: x.bloodGroup.name,
    GenoType: x.genoType.name,
    Religion: x.religion.name,
  }));

  let workSheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet(dataToExport, <xlsx.Table2SheetOpts>{ sheet: 'Sheet 1' });
  let workBook: xlsx.WorkBook = xlsx.utils.book_new();

   // Adjust column width
   var wscols = [
    { wch: 30 },
    { wch: 20 },
    { wch: 10 },
    { wch: 20 },
    { wch: 10 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
  ];

  workSheet["!cols"] = wscols;

  xlsx.utils.book_append_sheet(workBook, workSheet, 'Sheet 1');
  xlsx.writeFile(workBook, `Student_Table.xlsx`);

 }




}
