import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterService } from './register.service';

@Component({
  templateUrl: './register.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  constructor(private readonly registerService: RegisterService) {}

  onRegister(username: string, email: string, password: string): void {
    const success = this.registerService.register(username, email, password);
    if (success) {
      console.log('Registration successful');
      // Here you would typically navigate to another page or update the UI
    } else {
      console.log('Registration failed');
      // Here you would typically show an error message
    }
  }
}
