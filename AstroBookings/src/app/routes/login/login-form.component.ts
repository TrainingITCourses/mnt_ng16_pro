import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { passwordValidator } from 'app/shared/utils/form.validators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Output() login = new EventEmitter<void>();

  loginForm = this.formBuilder.group({
    email: new FormControl('a@b.c', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      passwordValidator,
    ]),
  });

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  mustDisplayError(control: FormControl): boolean {
    return control.invalid && control.touched;
  }

  getDisplayError(control: FormControl): string {
    if (control.hasError('required')) {
      return 'This field is required';
    } else if (control.hasError('email')) {
      return 'Invalid email';
    } else if (control.hasError('minlength')) {
      return 'Password must be at least 4 characters';
    } else {
      return JSON.stringify(control.errors);
    }
  }

  constructor(private readonly formBuilder: FormBuilder) {}

  onSubmit(): void {
    this.login.emit();
  }
}
