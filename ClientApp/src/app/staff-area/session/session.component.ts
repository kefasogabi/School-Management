import { UserService } from './../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Session, Term } from '../../models/user.model';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  loading = false;
  load = false;

  session = {};
  sessions: Session[] = [];
  ses: Session;

  term = {};
  terms: Term[] = [];
  ter: Session;

  constructor(private userService: UserService, private toastr: ToastrService) { }


 
  ngOnInit() {
    this.resetForm();
    this.loadAllSessions();
    this.loadAllTerms();
  }

  postSession(form:NgForm){

    if(form.value.id != null){
      this.loading = true;
      this.userService.updateSession(form.value).subscribe(data =>{
        this.resetForm(form);
        this.loadAllSessions();
      this.toastr.success('Session Updated successfully', 'Success');
      this.loading = false;
      });
    }
    else{
      this.loading = true;
    this.userService.postSession(form.value).subscribe( data => {
      this.resetForm(form);
      this.loadAllSessions();
      this.toastr.success('Session Added successfully', 'Success');
      this.loading = false;
    },
    error => {
      if(error.status == 400)
      this.toastr.error('Uknown Error occured when processing Your Request.', 'Error');
      this.loading = false;
    });
    }
    
  }

  deleteSession(id){
    this.userService.deleteSession(id).subscribe(() => {
      this.sessions.splice(id, 1);
      this.loadAllSessions();
    });
  }

  private loadAllSessions(){
    this.userService.getSessions().subscribe(data => {
      this.sessions = data;
    });
  }

  resetForm(form? : NgForm){
    
    if(form != null)
    form.reset();
    this.ses ={
      id: null,
      name: '',
    }
  }

  editSession(id){

    this.userService.getSession(id).subscribe( (data) => {
      this.session = data;
      console.log(this.session);
    });
  }

  postTerm(form: NgForm){
    if(form.value.id  != null){
      this.load = true;
    this.userService.updateTerm(form.value).subscribe( (data:any) => {
      this.resetForm(form);
      this.loadAllTerms();
      this.toastr.success('Term Updated successfully', 'Success');
      this.load = false; 
  });
    }
    else{
      this.load = true;
    this.userService.postTerm(form.value).subscribe( (data:any) => {
      this.resetForm(form);
      this.loadAllTerms();
      this.toastr.success('Term Added successfully', 'Success');
      this.load = false;
  });

    }
    
}


private loadAllTerms(){
  this.userService.getTerms().subscribe(data => {
    this.terms = data;
  });
}

editTerm(id){
  this.userService.getTerm(id).subscribe((data) => {
    this.term = data;
  })
}

deleteTerm(id){
  this.userService.deleteTerm(id).subscribe(()=>{
    this.terms.splice(id, 1);
    this.loadAllTerms();
  });
}
  

}
