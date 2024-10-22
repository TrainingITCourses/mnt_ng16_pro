import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '@app/services/local-storage.service';
import { environment } from 'environments/environment';
import { catchError, Observable, of, tap } from 'rxjs';

/**
 * App Initializer Factory, creates a function that will be used to initialize the application
 * @param http - HttpClient
 * @param localStorage - LocalStorageService
 * @returns - A function that initializes the application returning an observable
 */
export function appInitializerFactory(
  http: HttpClient,
  localStorage: LocalStorageService,
): () => Observable<unknown> {
  const initializerFunction = () => storeTime(http, localStorage);
  return initializerFunction;
}

function storeTime(http: HttpClient, localStorage: LocalStorageService): Observable<unknown> {
  const timeZone = environment.timeZone;
  const url = `https://worldtimeapi.org/api/timezone/${timeZone}`;
  return http.get(url).pipe(
    tap((data) => localStorage.write('time', data)),
    catchError((error) => {
      console.error(error);
      return of(null);
    }),
  );
}
