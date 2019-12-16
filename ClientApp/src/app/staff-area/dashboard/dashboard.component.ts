import { DashboardService } from './../../Services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  BarChart: any;
  BarChart1: any;
  BarChart2: any;
  BarChart3: any;
  boys: any;
  girls: any;
  students: any;
  staffs: any;
  gradeMale: any;
  gradeFemale: any;

  
  constructor(private dashBoard: DashboardService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

 

    let sources = [
      this.dashBoard.getBoys(),
      this.dashBoard.getGirls(),
      this.dashBoard.getStudents(),
      this.dashBoard.getStaffs(),
      this.dashBoard.getGrades(),
      this.dashBoard.getStaffGenders(),
      this.dashBoard.getGradeMale(),
      this.dashBoard.getGradeFemale()
     ];
     
     Observable.forkJoin(sources).subscribe(data => {
        this.spinner.show();
        
      this.boys = data[0];
      this.girls = data[1];
      this.students = data[2];
      this.staffs = data[3];
      let grades:any[] = data[4];
      let staffGenders:any[] = data[5];
      this.gradeMale = data[6];
      this.gradeFemale = data[7];

      this.spinner.hide();


      this.BarChart = new Chart('barChart', {
        type: 'bar',
        data: {
            labels: ['JSS1', 'JSS2', 'JSS3', 'SSS1', 'SSS2', 'SSS3'],
            datasets: [{
                label: `No of Students`,
                data: grades,
                backgroundColor: [
                    '#007bff',
                    '#007bff',
                    '#007bff',
                    '#007bff',
                    '#007bff',
                    '#007bff'
                ]
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });


    this.BarChart1 = new Chart('barChart1', {
      type: 'bar',
      data: {
          labels: ['Male', 'Female'],
          datasets: [{
              label: `No of Students`,
              data: [this.boys, this.girls],
              backgroundColor: [
                  '#28a745',
                  '#28a745'
              ]
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });


  this.BarChart2 = new Chart('barChart2', {
    type: 'bar',
    data: {
        labels: ['Male', 'Female'],
        datasets: [{
            label: `No of Staffs`,
            data: staffGenders,
            backgroundColor: [
                '#17a2b8',
                '#17a2b8'
            ]
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


this.BarChart3 = new Chart('barChart3', {
    type: 'bar',
    data: {
        labels: ['JSS1', 'JSS2', 'JSS3', 'SSS1', 'SSS2', 'SSS3'],
        datasets: [
            {
                label               : 'Male',
                backgroundColor     : [
                                        '#3d9970',
                                        '#3d9970',
                                        '#3d9970',
                                        '#3d9970',
                                        '#3d9970',
                                        '#3d9970'
                ],
                data                : this.gradeMale
              },
              {
                label               : 'Female',
                backgroundColor     : [
                        '#adb5bd',
                        '#adb5bd',
                        '#adb5bd',
                        '#adb5bd',
                        '#adb5bd',
                        '#adb5bd'
                ],
                data                : this.gradeFemale
              },
    ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


   

     });

   
        
  

  }

}
