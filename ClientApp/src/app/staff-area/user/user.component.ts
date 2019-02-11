
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableResource } from 'angular-4-data-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataTableDirective } from 'angular-datatables';
import { UserService } from '../../Services/user.service';
import { User } from '../../Services/user.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  //  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  users: User[] = [];
  staff = {};
  public id = '';
  


  constructor(private userService: UserService, private route: ActivatedRoute, private spinner: NgxSpinnerService) { 
    let id = this.route.snapshot.paramMap.get('id');
    if (id) this.userService.getById(id).take(1).subscribe(data => this.staff = data );
  }

  ngOnInit() {
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   responsive: true,
      
    // };
    this.spinner.show();
    this.loadAllUsers();
  
     this.spinner.hide();  
  }

  setId(id) {
    this.id = id;
  }

  delete(id){
    this.userService.delete(id).subscribe(() => {
      this.users.splice(id, 1);
      this.loadAllUsers();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private loadAllUsers(){
    this.userService.getAll().subscribe( users =>{
      this.users = users;
     
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
  
      
    });
  }

  

  

}
