import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 0) {
          this.openSnackBar('Server is not responding, please try again later');
        } else if (error.status === 429) {
          this.openSnackBar('Too many requests, please try again later');
        }
        return throwError(error);
      })
    );
  }

  private openSnackBar(message: string): void {
    this._snackBar.open(message, 'Dismiss', {
      duration: 8000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
}
