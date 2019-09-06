import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../Services/authentication.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private route: Router, private authService: AuthenticationService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
      if(this.authService.isLoggedIn())
    return true;
    
      this.route.navigate(['/student/login'], {queryParams: {returnUrl: state.url}});
      return false;
  }


 
}
