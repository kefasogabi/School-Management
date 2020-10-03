import { ToastrService } from 'ngx-toastr';
import { ResultService } from './../../Services/result.service';
import { StudentService } from './../../Services/student.service';
import { Component, OnInit } from '@angular/core';
import { Stud, Student } from '../../models/student.model';
import { Term } from '../../models/user.model';
import { NgxSpinnerService } from 'ngx-spinner';
declare let pdfMake: any ;

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  student: Student
  yea:any = "Select Term";
  subjects: any[];
  average:number = 0;
  pdf:any;

  constructor(private studentService: StudentService,
              private resultService:ResultService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit() {

    this.studentService.getProfile().subscribe((data:any) => {
      this.student = data;
    });

  }

  onYearChange(id){
    this.spinner.show();
    this.resultService.getResults(id).subscribe((data:any) =>{
      let res:any[];
      res = data;

     let result = res.filter(m => m.year == this.yea);

     this.subjects = result.map(x => ({ id: x.id,
                                        name: x.name,
                                        ass1: parseInt(x.ass1),
                                        ass2: parseInt(x.ass2),
                                        cA1: parseInt(x.cA1),
                                        cA2: parseInt(x.cA2),
                                        exam: parseInt(x.exam),
                                        year: x.year,
                                        studentId: x.studentId,
                                        total: parseInt(x.ass1) + parseInt(x.ass2) + parseInt(x.cA1) + parseInt(x.cA2) + parseInt(x.exam) }));

      this.average = this.getAverage();
      this.openPdf();
      this.spinner.hide();
    }, error =>{
      this.toastr.error(error, 'Error');
      this.spinner.hide();
    });

  }

  getAverage(){
    let sum = 0;
    let count = 0;
    let result = 0;
    this.subjects.forEach( x => sum += x.total);


    for(let obj in this.subjects){
      count++
    }

    result = sum / count;

    return result;
  }

  openPdf(){

    const documentDefinition = this.getDocumentDefinition();
        this.pdf = documentDefinition;
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.getDataUrl((dataUrl) => {
      const targetElement = document.querySelector('#iframeContainer');
      const iframe = document.createElement('iframe');

      iframe.src = dataUrl;
      iframe.style.width = "100%";
      iframe.style.height = "800px";
      targetElement.appendChild(iframe);

    });

  }

  generatePdf(action) {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }

 getDocumentDefinition() {
    return {
     content: [
       {
        columns: [
          // [{
          //   image: 'src/assets/avatar.jpg',
          //   fit:[50, 50],
          //   alignment : 'left'
          // }
          // ],
          [
            {
              text: 'DOMINION INTERNATIONAL HIGH SCHOOL',
              bold: true,
              fontSize: 20,
              color: '#007bff',
              alignment: 'center',
              margin: [0, 0, 0, 15]
            },
            {
              text: 'P.M.B 1022 KEFFI',
              bold: true,
              fontSize: 10,
              color: '#007bff',
              alignment: 'center',
              margin: [0, 0, 0, 16]
            }
          ],
          // [
          //   {
          //     image: 'assets/avatar.jpg',
          //     width: 75,
          //     height:80,
          //     alignment : 'right'
          //   }
          // ]
        ]
      },
      {
        text: 'Result',
        style: 'header'
      },
      this.getResultObject(),

      {
        text: 'Sign:_________________',
        style: 'sign'
      },
      {
        columns : [
            [{ qr: this.student.userName + ', Contact No : ' + this.student.nkPhoneNumber, fit : 80, alignment: 'left' }],
            [{
            text: `(${this.student.userName})`,
            alignment: 'right',
            }]
        ]
      }
      ],
      info: {
        title: ` ${this.student.firstName.toUpperCase()} ${this.student.lastName.toUpperCase()} RESULT SHEET`,
        author: 'DOMINION HIGH SCHOOL',
        subject: 'RESULT',
        keywords: 'RESULT SHEET',
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          color: '#000000',
          alignment: 'center',
        },
        name: {
          fontSize: 16,
          bold: true
        },
        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
          fontSize:10,
          color: '#000000',
        },
        table:{
          fontSize:10,
        }
      }

    }
  }


  getResultObject() {
    return {
      table: {
        widths: ['*', '*', '*', '*', '*', '*', '*'],
        body: [
          [{
            text: 'Subject',
            style: 'tableHeader'
          },
          {
            text: '1st CA',
            style: 'tableHeader'
          },
          {
            text: '2nd CA',
            style: 'tableHeader'
          },
          {
            text: '1st Assgmt',
            style: 'tableHeader'
          },
          {
            text: '2nd Assgmt',
            style: 'tableHeader'
          },
          {
            text: 'Exam',
            style: 'tableHeader'
          },
          {
            text: 'Total',
            style: 'tableHeader'
          },
          ],


          ...this.subjects.map(x => {
            return [{
              text: x.name,
              style: 'table'
            },
            {
              text:x.ass1,
              style: 'table'
            },
            {
              text: x.ass2,
              style: 'table'
            },
            {
              text: x.cA1,
              style: 'table'
            },
            {
              text: x.cA2,
              style: 'table'
            },
            {
              text: x.exam,
              style: 'table'
            },
            {
              text: x.total,
              style: 'table'
            }];
          }),

          [{
            text: 'Average',
            style: 'tableHeader',
            colSpan: 6,
             alignment: 'center'
          },
          {},
          {},
          {},
          {},
          {},
          {
            text: this.average.toFixed(2),
            style: 'tableHeader'
          },
          ],

        ],

      },
      layout: {
        hLineWidth: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? 1 : 1;
        },
        vLineWidth: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? 1 : 1;
        },
        hLineColor: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
        },
        vLineColor: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
        },
        fillColor: function (rowIndex, node, columnIndex) {
          return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
        }
      }
    };
  }









}
