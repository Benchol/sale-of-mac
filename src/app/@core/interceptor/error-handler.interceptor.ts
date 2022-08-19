import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { Router } from '@angular/router';
import { AuthService } from '../services/authentification/auth.service';


@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private route: Router, private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("Passed through the interceptor in request");

    return next.handle(request)
      .pipe(
        map(res => {
          console.log("Passed through the interceptor in response");
          return res
        }),
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('This is client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            console.log('This is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          console.log('ERROR => ', errorMsg);
          if(error.status == 404 ) {
            this.route.navigate(['not-found'], {queryParams: {
              message: errorMsg
            }})
          } else if(error.status == 401) {
            this.authService.error.next({
              message: error.error.message,
              status: true
            })
          } else if(error.status == 402) {
            this.route.navigate(['/auth/login'])
          } else if(error.status == 403) {
            console.log('Token expired');
            this.route.navigate(['/auth/login'])
          }
          return throwError(errorMsg);
        })
      )
  }
}
