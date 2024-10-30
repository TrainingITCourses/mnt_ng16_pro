import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  EmailAsyncValidator,
  matchPasswordValidator,
  passwordValidator,
} from 'app/shared/utils/form.validators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  @Output() register = new EventEmitter<{ username: string; email: string; password: string }>();

  registerForm = this.formBuilder.group(
    {
      username: new FormControl('', { validators: [Validators.required] }),
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: [this.emailAsyncValidator.validate],
          updateOn: 'blur',
        },
      ],
      password: ['', [Validators.required, Validators.minLength(4), passwordValidator]],
      repeatPassword: new FormControl('', { validators: [] }),
    },
    { validators: [matchPasswordValidator] },
  );

  get username(): FormControl {
    return this.registerForm.get('username') as FormControl;
  }

  get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  get repeatPassword(): FormControl {
    return this.registerForm.get('repeatPassword') as FormControl;
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

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly emailAsyncValidator: EmailAsyncValidator,
  ) {}

  onSubmit(): void {
    this.register.emit({ username: '2', email: '', password: '' });
  }
}
