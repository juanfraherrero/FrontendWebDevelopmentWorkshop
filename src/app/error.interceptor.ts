import {HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse, 
    HttpEvent} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInteceptor implements HttpInterceptor{

    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorServidor: boolean = true
                    let errorMessage = '';
                    this.router.navigate(['/falied/error/view'], {queryParams: error})
                    return throwError(errorMessage);
                })
                )
    }
}