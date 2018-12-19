import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../../Services/user.model';
import { UserService } from '../../Services/user.service';



@Component({
  selector: 'app-staff-register',
  templateUrl: './staff-register.component.html',
  styleUrls: ['./staff-register.component.css']
})
export class StaffRegisterComponent implements OnInit {

  model: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    address: '',
    password:'',
    role:0,
    fileName: '',
  };
 
  loading = false;
  roles : any[];
  user: User;


  constructor( private userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    // this.resetForm();

      this.userService.getAllRoles().subscribe(
        (data: any) => {
            data.forEach(obj => obj.seletcted = false);
            this.roles = data;
        }
      );
  }

  register(form: NgForm) {
   
    this.loading = true;
//    var x = this.roles.filter(x => x.selected).map(y => y.name);
    this.userService.create(form.value)
        .subscribe(
            (data: any) => {
                // this.resetForm(form);
                console.log(data);
                this.toastr.success('Registration successful', 'Success');
                this.router.navigate(['/staff-login']);
            },
            error => {
                if(error.status == 400)
                this.toastr.error('Uknown Error occured when processing Your Request.', 'Error');
                this.loading = false;
              });
}

        // updateSelectedRoles(index){
        //     this.roles[index].selected = !this.roles[index].selected;
        // }

        // onRoleToggle(roleId, $event){
        //     if($event.target.checked)
        //     this.model.role.push(roleId);
        //     else{
        //         var index = this.model.role.indexOf(roleId);
        //         this.model.role.splice(index, 1);
        //     }

        // }

        // resetForm(form? : NgForm){
            
        //     if(form != null)
        //     form.reset();
        //     this.user ={
        //     id: null,
        //     firstName: '',
        //     lastName: '',
        //     email: '',
        //     address: '',
        //     dateOfBirth: '',
        //     password: '',
        //     }
        // }

}
