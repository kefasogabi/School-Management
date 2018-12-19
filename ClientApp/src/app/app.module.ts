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
import { MainLoginComponent } from './main-login/main-login.component';
import { StaffLoginComponent } from './main-login/staff-login/staff-login.component';
import { StudentLoginComponent } from './main-login/student-login/student-login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ServiceComponent } from './service/service.component';
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
import { UploadImageComponent } from './staff-area/upload-image/upload-image.component';
import { StudentChangepasswordComponent } from './student-area/student-changepassword/student-changepassword.component';







@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    StaffLoginComponent,
    StaffRegisterComponent,
    ViewStaffComponent,
    StudentRegisterComponent,
    StudentLoginComponent,
    EditStaffComponent,
    StudentComponent,
    ViewStudentComponent,
    EditStudentComponent,
    StudentProfileComponent,
    StaffProfileComponent,
    StaffAreaComponent,
    NavBarComponent,
    AboutUsComponent,
    ContactUsComponent,
    ServiceComponent,
    MainLoginComponent,
    ChangePasswordComponent,
    UploadImageComponent,
    StudentAreaComponent,
    StudentChangepasswordComponent,

   
    
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
      { path: '', component: HomeComponent,
        children: [{ path: '', component: HomeComponent, pathMatch: 'full'}]
      },
      { path: 'about', component: AboutUsComponent},
      { path: 'contact', component: ContactUsComponent},
      { path: 'services', component: ServiceComponent},
      
///////////////////////////////
      { path: 'staff-login', component: MainLoginComponent,
        children: [{ path: '', component: StaffLoginComponent}]
      },
      { path: 'student-login', component: MainLoginComponent,
        children: [{ path: '', component: StudentLoginComponent}]
      },
    ///////////////////////////
      
      //Student Area Starts Here
      { path: 'student-profile', component: StudentAreaComponent,
        children: [{ path: '', component: StudentProfileComponent}]
      },
      { path: 'student-change-password', component: StudentAreaComponent,
        children: [{ path: '', component: StudentChangepasswordComponent}]
      },
      // Staff Area Ends Here


      //Staff Area Starts Here
      { path: 'edit-staff/:id', component: StaffAreaComponent,
        children: [{ path: '', component: EditStaffComponent}]
      },
      { path: 'view-staff/:id', component: StaffAreaComponent,
        children: [{ path: '', component: ViewStaffComponent}]
      },
      { path: 'view-student/:id', component: StaffAreaComponent,
        children: [{ path: '', component: ViewStudentComponent}]
      },
      { path: 'edit-student/:id', component: StaffAreaComponent,
        children: [{ path: '', component: EditStudentComponent}]
      },

      { path: 'staff-profile', component: StaffAreaComponent,
        children: [{ path: '', component: StaffProfileComponent}]
      },

      { path: 'staffs', component: StaffAreaComponent,
        children: [{ path: '', component: UserComponent}]
      },
      { path: 'students', component: StaffAreaComponent,
        children: [{ path: '', component: StudentComponent}]
      },
      { path: 'staff-register', component: StaffAreaComponent,
        children: [{ path: '', component: StaffRegisterComponent}]
      },
      { path: 'student-register', component: StaffAreaComponent,
        children: [{ path: '', component: StudentRegisterComponent}]
      },

      { path: 'change-password', component: StaffAreaComponent,
        children: [{ path: '', component: ChangePasswordComponent}]
      },

    { path: 'upload-photo', component: StaffAreaComponent,
    children: [{ path: '', component: UploadImageComponent}]
  },
      // Staff Area Ends Here
     
     
    ])
  ],
  providers: [
    
    AuthenticationService,
    StudentauthService,
    UserService,
    StaffAuthGuard,
    StudentService,
    LoaderService,
    { provide: ErrorHandler, useClass:AppErrorHandler },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
