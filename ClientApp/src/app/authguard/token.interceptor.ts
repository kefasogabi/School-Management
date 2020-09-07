import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _throw as throwError } from 'rxjs/observable/throw';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth:AuthService, private toastr:ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();

    if (token) {
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (!request.headers.has('Content-Type')) {
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    return next.handle(request).pipe(
        catchError((err:HttpErrorResponse) => {
            if ([401, 403].indexOf(err.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                this.auth.logout();
                location.reload(true);
            }

                let errorMessage = '';
            if (err.error instanceof ErrorEvent) {
                // client-side error
                errorMessage = `Error: ${err.error.message}`;
            } else {
                // server-side error
                errorMessage = `Error Code: ${err.status}\nMessage: ${err.error}`;
            }


            
            return throwError(errorMessage);
        })
        );
}

}