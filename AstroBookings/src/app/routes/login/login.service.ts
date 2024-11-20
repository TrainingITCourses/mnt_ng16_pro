import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/env/environment.development';
import { UserTokenDto } from '@app/models/user-token.dto';
import { UsersStore } from '@app/services/users.store';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly http: HttpClient, private readonly userStore: UsersStore) {}

  login(username: string, password: string): boolean {
    // This is a placeholder implementation
    // In a real application, you would typically make an API call here
    console.log(`Attempting to log in user: ${username}`);
    this.http
      .post<UserTokenDto>(`${environment.apiUrl}/login?delay=2000&status=201`, {
        username,
        password,
      })
      .subscribe((response) => this.userStore.dispatch('login', response));
    return true;
    //return username === 'admin' && password === 'password';
  }
}
