import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  login(username: string, password: string): boolean {
    // This is a placeholder implementation
    // In a real application, you would typically make an API call here
    console.log(`Attempting to log in user: ${username}`);
    return username === 'admin' && password === 'password';
  }
}
