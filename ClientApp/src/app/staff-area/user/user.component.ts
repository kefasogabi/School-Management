
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableResource } from 'angular-4-data-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataTableDirective } from 'angular-datatables';
import { UserService } from '../../Services/user.service';
import { AuthenticationService } from '../../Services/authentication.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

   dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  users: any[];
  staff = {};
  public id = '';
  


  constructor(private userService: UserService, 
              private route: ActivatedRoute, 
              private spinner: NgxSpinnerService,
              private authService: AuthenticationService) { 
    let id = this.route.snapshot.paramMap.get('id');
    if (id) this.userService.getById(id).take(1).subscribe(data => this.staff = data );
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
      
    };
   
    this.loadAllUsers();
  
    
  }

  setId(id) {
    this.id = id;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  delete(id){
    this.userService.delete(id).subscribe(() => {
      this.users.splice(id, 1);
      this.loadAllUsers();
    });
  }

  private loadAllUsers(){
    this.userService.getAll().subscribe( data =>{
      this.users = data;
     
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
  
      
    });
  }

  

  

}
