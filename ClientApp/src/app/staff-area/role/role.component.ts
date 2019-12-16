import { KeyValuePair } from './../../models/student.model';
import { UserService } from './../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  role = {};
  roles : any[];
  rol:KeyValuePair;
  constructor( private userService: UserService,
               private toastr: ToastrService,
              private spinner: NgxSpinnerService, ) { }

  ngOnInit() {

   this.getAll();


  }

  getRole(id){
    this.userService.getRole(id).subscribe(data => {
      this.role = data;
    });
  }

  postRole(form:NgForm){
    this.spinner.show();
    this.userService.postRole(form.value).subscribe(data => {
      this.resetForm(form);
      this.getAll();
      this.toastr.success('Role added successfully', 'Success');
      this.spinner.hide();
    }, error => {
      if(error.status === 400)
      this.toastr.error(error._body, 'Error');
      this.spinner.hide();
    });
  }

  deleteRole(id){
    this.spinner.show();
    this.userService.deleteRole(id).subscribe(() => {
      this.roles.splice(id, 1);
      this.toastr.success('Role Deleted Successfully', 'Success');
      this.getAll();
      this.spinner.hide();
    }, error =>{
      this.toastr.error(error._body, 'Error');
      this.spinner.hide();
    });
  }

  resetForm(form? : NgForm){
    
    if(form != null)
    form.reset();
    this.rol ={
      id: null,
      name: '',
    }
  }

  private getAll(){
    this.userService.getAllRoles().subscribe(
      (data: any) => {
          this.roles = data;
      }
    );
  }

}
