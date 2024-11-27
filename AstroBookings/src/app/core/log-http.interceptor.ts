import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalStore } from '@app/services/global.store';
import { LogService } from '@app/services/log.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

/**
 * An Http Interceptor that logs the HTTP requests and errors
 * @requires LogService
 */
@Injectable()
export class LogHttpInterceptor implements HttpInterceptor {
  private startTime = 0;

  constructor(private logService: LogService, private globalStore: GlobalStore) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.logService.log(`HTTP Request: ${request.method} ${request.url}`);
    this.startTime = Date.now();
    this.globalStore.dispatch({ type: 'apiLoading' });

    return next.handle(request).pipe(
      catchError((error) => {
        this.logService.error(`HTTP Error: ${error.status} ${error.message}`);
        this.globalStore.dispatch({ type: 'apiError', payload: error.message });
        return throwError(() => error);
      }),
      tap(() => {
        const endTime = Date.now();
        const requestTime = endTime - this.startTime;
        this.globalStore.dispatch({ type: 'apiComplete', payload: requestTime });
      }),
    );
  }
}
