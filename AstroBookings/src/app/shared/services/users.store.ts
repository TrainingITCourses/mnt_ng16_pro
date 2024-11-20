import { Injectable } from '@angular/core';
import { UserTokenDto } from '@app/models/user-token.dto';
import { distinctUntilChanged, map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersStore {
  readonly #users$: Subject<UserTokenDto | undefined> = new Subject<UserTokenDto | undefined>();

  /**
   * Observable that emits the current user
   */
  private readonly users$: Observable<UserTokenDto | undefined> = this.#users$.asObservable();

  readonly selectIsLoggedIn$: Observable<boolean> = this.users$.pipe(
    map((userToken) => !!userToken),
  );

  readonly selectToken$: Observable<string> = this.users$.pipe(
    map((userToken) => userToken?.token || ''),
    distinctUntilChanged(),
  );

  readonly selectRole$: Observable<string> = this.users$.pipe(
    map((userToken) => userToken?.user.role || ''),
  );

  select<T>(selectFn: (userToken: UserTokenDto | undefined) => T): Observable<T> {
    return this.users$.pipe(map(selectFn), distinctUntilChanged());
  }

  dispatch(action: 'login' | 'logout', payload: UserTokenDto | undefined): void {
    if (action === 'login') {
      this.login(payload!);
    } else {
      this.logout();
    }
  }

  /**
   * dispatch a login action
   * @param userToken payload with the user and token
   */
  private login(userToken: UserTokenDto): void {
    // validar
    this.#users$.next(userToken);
  }

  /**
   * dispatch a logout action
   */
  private logout(): void {
    // efectuar secundario
    this.#users$.next(undefined);
  }
}
