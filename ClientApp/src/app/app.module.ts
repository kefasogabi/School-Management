import { AdminAuthGuard } from './authguard/adminauthguard';
import { AlertService } from './Services/alert.service';
import { UniversalService } from './Services/universal.service';
import { AuthenticationService } from './Services/authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Http, HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { UserService } from './Services/user.service';
import { AppErrorHandler } from './app.error-handler';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StaffAuthGuard } from './authguard/staffauthguard';
import { StudentauthService } from './Services/studentauth.service';
import { StudentService } from './Services/student.service';
import { DataTablesModule } from 'angular-datatables';
import { LoaderService } from './Services/loader.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { StaffAreaComponent } from './staff-area/staff-area.component';
import { StaffProfileComponent } from './staff-area/staff-profile/staff-profile.component';
import { ChangePasswordComponent } from './staff-area/change-password/change-password.component';
import { StudentAreaComponent } from './student-area/student-area.component';
import { StudentProfileComponent } from './student-area/student-profile/student-profile.component';
import { EditStudentComponent } from './staff-area/edit-student/edit-student.component';
import { StudentComponent } from './staff-area/student/student.component';
import { StaffRegisterComponent } from './staff-area/staff-register/staff-register.component';
import { StudentRegisterComponent } from './staff-area/student-register/student-register.component';
import { UserComponent } from './staff-area/user/user.component';
import { ViewStaffComponent } from './staff-area/view-staff/view-staff.component';
import { EditStaffComponent } from './staff-area/edit-staff/edit-staff.component';
import { ViewStudentComponent } from './staff-area/view-student/view-student.component';
import { StudentChangepasswordComponent } from './student-area/student-changepassword/student-changepassword.component';
import { SessionComponent } from './staff-area/session/session.component';
import { ResultComponent } from './student-area/result/result.component';
import { ResultService } from './Services/result.service';
import { AlertComponent } from './alert/alert.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StaffLoginComponent } from './staff-login/staff-login.component';
import { StudentBarComponent } from './student-area/student-bar/student-bar.component';
import { StaffBarComponent } from './staff-area/staff-bar/staff-bar.component';
import { DashboardComponent } from './staff-area/dashboard/dashboard.component';
import { DashboardService } from './Services/dashboard.service';
import { ResultsComponent } from './staff-area/results/results.component';
import { StaffFooterComponent } from './staff-area/staff-footer/staff-footer.component';
import { AuthGuard } from './authguard/authguard';









@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    StaffRegisterComponent,
    ViewStaffComponent,
    StudentRegisterComponent,
    EditStaffComponent,
    StudentComponent,
    ViewStudentComponent,
    EditStudentComponent,
    StudentProfileComponent,
    StaffProfileComponent,
    StaffAreaComponent,
    StudentLoginComponent,
    StaffLoginComponent,
    ChangePasswordComponent,
    StudentAreaComponent,
    StudentChangepasswordComponent,
    SessionComponent,
    ResultComponent,
    AlertComponent,
    StudentBarComponent,
    StaffBarComponent,
    DashboardComponent,
    ResultsComponent,
    StaffFooterComponent,

   
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    HttpModule,
    FormsModule,
    DataTablesModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: StudentLoginComponent },
      
///////////////////////////////
      { path: 'staff/login', component: StaffLoginComponent },
      { path: 'student/login', component: StudentLoginComponent },
    ///////////////////////////
      
      //Student Area Starts Here
      { path: 'student-profile', component: StudentAreaComponent,
        children: [{ path: '', component: StudentProfileComponent, canActivate: [AuthGuard]}]
      },
      { path: 'student-change-password', component: StudentAreaComponent,
        children: [{ path: '', component: StudentChangepasswordComponent, canActivate: [AuthGuard]}]
      },
      {
        path: 'result', component: StudentAreaComponent,
        children: [{ path: '', component: ResultComponent, canActivate: [AuthGuard] }]
      },
      // Staff Area Ends Here


      //Staff Area Starts Here
      { path: 'edit-staff/:id', component: StaffAreaComponent,
        children: [{ path: '', component: EditStaffComponent, canActivate: [AdminAuthGuard]}]
      },
      { path: 'view-staff/:id', component: StaffAreaComponent,
        children: [{ path: '', component: ViewStaffComponent, canActivate: [AdminAuthGuard]}]
      },
      { path: 'view-student/:id', component: StaffAreaComponent,
        children: [{ path: '', component: ViewStudentComponent, canActivate: [StaffAuthGuard]}]
      },
      { path: 'edit-student/:id', component: StaffAreaComponent,
        children: [{ path: '', component: EditStudentComponent, canActivate: [AdminAuthGuard]}]
      },
      { path: 'staff/dashboard', component: StaffAreaComponent,
        children: [{ path: '', component: DashboardComponent, canActivate: [StaffAuthGuard]}]
      },

      { path: 'staff-profile', component: StaffAreaComponent,
        children: [{ path: '', component: StaffProfileComponent, canActivate: [StaffAuthGuard]}]
      },
      { path: 'session', component: StaffAreaComponent,
        children: [{ path: '', component: SessionComponent, canActivate: [AdminAuthGuard]}]
      },
      { path: 'edit-session/:id', component: StaffAreaComponent,
        children: [{ path: '', component: SessionComponent, canActivate: [AdminAuthGuard]}]
      },

      { path: 'staffs', component: StaffAreaComponent,
        children: [{ path: '', component: UserComponent, canActivate: [AdminAuthGuard]}]
      },
      { path: 'students', component: StaffAreaComponent,
        children: [{ path: '', component: StudentComponent, canActivate: [StaffAuthGuard]}]
      },
      { path: 'staff-register', component: StaffAreaComponent,
        children: [{ path: '', component: StaffRegisterComponent, canActivate: [AdminAuthGuard]}]
      },
      { path: 'student-register', component: StaffAreaComponent,
        children: [{ path: '', component: StudentRegisterComponent, canActivate: [AdminAuthGuard]}]
      },

      { path: 'change-password', component: StaffAreaComponent,
        children: [{ path: '', component: ChangePasswordComponent, canActivate: [StaffAuthGuard]}]
      },
      {
        path: 'results', component: StaffAreaComponent,
        children: [{ path: '', component: ResultsComponent, canActivate: [StaffAuthGuard]}]
      },

      // Staff Area Ends Here
     
     
    ])
  ],
  providers: [
    
    AuthenticationService,
    StudentauthService,
    UserService,
    StaffAuthGuard,
    AdminAuthGuard,
    AuthGuard,
    StudentService,
    LoaderService,
    UniversalService,
    ResultService,
    AlertService,
    DashboardService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
