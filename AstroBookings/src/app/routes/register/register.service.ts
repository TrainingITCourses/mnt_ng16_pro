import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserTokenDto } from '@app/models/user-token.dto';
import { GlobalStore } from '@app/services/global.store';
import { UsersStore } from '@app/services/users.store';
import { environment } from 'environments/environment.development';
import { Observable, tap } from 'rxjs';
import { RegisterDto } from './register.dto';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(
    private readonly http: HttpClient,
    private readonly userStore: UsersStore,
    private readonly globalStore: GlobalStore,
  ) {}

  register$(registerDto: RegisterDto): Observable<UserTokenDto> {
    console.log(`Attempting to register user with email: ${registerDto.email}`);
    // delay to simulate a slow response, status to simulate a successful registration
    return this.http
      .post<UserTokenDto>(`${environment.apiUrl}/register?delay=2000&status=201`, registerDto)
      .pipe(
        tap((userToken) => this.userStore.dispatch('login', userToken)),
        tap((userToken) => this.globalStore.dispatch({ type: 'login', payload: userToken })),
      );
  }
}
