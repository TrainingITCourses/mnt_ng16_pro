import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmailAsyncValidator, matchPasswordValidator } from 'app/shared/utils/form.validators';
import { RegisterDto } from './register.dto';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  @Output() register = new EventEmitter<RegisterDto>();

  registerForm = this.formBuilder.group(
    {
      username: new FormControl('A', [Validators.required, Validators.minLength(3)]),
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: [this.emailValidators.validate],
          updateOn: 'blur',
        },
      ],
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required),
      acceptTerms: new FormControl(false, Validators.requiredTrue),
      role: new FormControl('it'),
    },
    {
      validators: [matchPasswordValidator],
    },
  );

  get username(): AbstractControl {
    return this.registerForm.get('username')!;
  }

  get email(): AbstractControl {
    return this.registerForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.registerForm.get('password')!;
  }

  get repeatPassword(): AbstractControl {
    return this.registerForm.get('repeatPassword')!;
  }

  get acceptTerms(): AbstractControl {
    return this.registerForm.get('acceptTerms')!;
  }

  get role(): AbstractControl {
    return this.registerForm.get('role')!;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly emailValidators: EmailAsyncValidator,
  ) {}

  onSubmit(): void {
    const { repeatPassword, ...rest } = this.registerForm.value;
    console.log('onSubmit', rest);
    this.register.emit(rest as RegisterDto);
  }
}
