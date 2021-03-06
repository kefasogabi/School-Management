import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../Services/auth.service';


@Injectable()
export class StaffAuthGuard implements CanActivate {

  constructor(private route: Router, private authService: AuthenticationService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
      if(this.authService.isLoggedIn() && this.authService.isStaff())
    return true;
    
      this.route.navigate(['/staff/login'], {queryParams: {returnUrl: state.url}});
      return false;
  }


 
}
