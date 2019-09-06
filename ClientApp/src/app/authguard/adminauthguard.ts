import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../Services/authentication.service';


@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private route: Router, private authService: AuthenticationService){}

  canActivate(route, state: RouterStateSnapshot): boolean {
      
      if(this.authService.isLoggedIn() &&  this.authService.isAdmin()) 
      return true;

      this.route.navigate(['/staff/login'], {queryParams: {returnUrl: state.url}});
      return false;
  }


 
}
