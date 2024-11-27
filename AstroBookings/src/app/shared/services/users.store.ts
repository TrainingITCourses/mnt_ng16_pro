import { Injectable } from '@angular/core';
import { UserTokenDto } from '@app/models/user-token.dto';
import { distinctUntilChanged, map, Observable, Subject } from 'rxjs';
/**
 * A store specialized in managing the user state
 */
@Injectable({
  providedIn: 'root',
})
export class UsersStore {
  /**
   * Subject that holds the current user
   * - It is private to prevent external modifications
   * - Must be used with dispatch method
   */
  readonly #users$: Subject<UserTokenDto | undefined> = new Subject<UserTokenDto | undefined>();

  /**
   * Observable that emits the current user
   * - Can be private to prevent external access to the whole subject
   * - Must be used with custom select methods
   */
  readonly users$: Observable<UserTokenDto | undefined> = this.#users$.asObservable();

  // The next functions could be implemented using the select method

  /**
   * Observable that emits if the user is logged only when it changes
   */
  readonly selectIsLoggedIn$: Observable<boolean> = this.users$.pipe(
    map((userToken) => !!userToken),
    distinctUntilChanged(),
  );

  /**
   * Observable that emits the user token changes
   */
  readonly selectToken$: Observable<string> = this.users$.pipe(
    map((userToken) => userToken?.token || ''),
    distinctUntilChanged(),
  );

  /**
   * Observable that emits the user role changes
   */
  readonly selectRole$: Observable<string> = this.users$.pipe(
    map((userToken) => userToken?.user.role || ''),
    distinctUntilChanged(),
  );

  /**
   * Generic select method to get a projection of the user
   * @param selectFn The custom projection function
   * @returns The custom projection
   */
  select<T>(selectFn: (userToken: UserTokenDto | undefined) => T): Observable<T> {
    return this.users$.pipe(map(selectFn), distinctUntilChanged());
  }

  /**
   * Dispatch a login or logout action
   * @param actionType The action type
   * @param typePayload The payload for the action
   */
  dispatch(actionType: 'login' | 'logout', typePayload: UserTokenDto | undefined): void {
    if (actionType === 'login') {
      this.login(typePayload!);
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
