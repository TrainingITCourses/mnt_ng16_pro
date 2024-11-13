import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserTokenDto } from '@app/models/user-token.dto';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';
import { RegisterDto } from './register.dto';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private readonly http: HttpClient) {}

  register$(registerDto: RegisterDto): Observable<UserTokenDto> {
    console.log(`Attempting to register user with email: ${registerDto.email}`);
    // delay to simulate a slow response, status to simulate a successful registration
    return this.http.post<UserTokenDto>(
      `${environment.apiUrl}/register?delay=2000&status=201`,
      registerDto,
    );
  }
}
