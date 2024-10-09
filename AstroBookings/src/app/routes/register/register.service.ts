import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor() {}

  register(username: string, email: string, password: string): boolean {
    // This is a placeholder implementation
    // In a real application, you would typically make an API call here
    console.log(`Attempting to register user: ${username} with email: ${email}`);
    return username.length > 0 && email.includes('@') && password.length >= 8;
  }
}
