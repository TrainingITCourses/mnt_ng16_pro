import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogService } from '@app/services/log.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * An Http Interceptor that logs the HTTP requests and errors
 * @requires LogService
 */
@Injectable()
export class LogHttpInterceptor implements HttpInterceptor {
  constructor(private logService: LogService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.logService.log(`HTTP Request: ${request.method} ${request.url}`);

    return next.handle(request).pipe(
      catchError((error) => {
        this.logService.error(`HTTP Error: ${error.status} ${error.message}`);
        return throwError(() => error);
      }),
    );
  }
}
