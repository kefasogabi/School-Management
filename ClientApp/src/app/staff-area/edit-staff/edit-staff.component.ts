
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { User } from '../../models/user.model';




@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.css']
})
export class EditStaffComponent implements OnInit {
  model = {};
  user: User;
  constructor(private userService: UserService, private route: ActivatedRoute, private toastr: ToastrService) {

    let id = this.route.snapshot.paramMap.get('id');
    if (id) this.userService.getById(id).take(1).subscribe(data => this.model = data );
    console.log("Head", this.model);
   }

  ngOnInit() {
  }

  update(form: NgForm){
    this.userService.update(form.value).subscribe( data => {
      this.toastr.success('Updated Successfully', 'User');
      console.log("Data",data);
    });
  }

   

}
