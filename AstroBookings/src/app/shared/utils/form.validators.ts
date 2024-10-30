import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';

export const passwordValidator = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value as string;
  const hasDigits = /\d/.test(value);
  if (!hasDigits) return { password: 'Password must contain digits: ' + value };
  const hasLetters = /[a-zA-Z]/.test(value);
  if (!hasLetters) return { password: 'Password must contain letters: ' + value };
  return null;
};

export const matchPasswordValidator = (form: AbstractControl): ValidationErrors | null => {
  const passwordControl = form.get('password');
  const repeatPasswordControl = form.get('repeatPassword');
  const password = passwordControl?.value as string;
  const repeatPassword = repeatPasswordControl?.value as string;
  const error = password !== repeatPassword ? { matchPassword: 'Passwords do not match' } : null;
  if (error) {
    repeatPasswordControl?.setErrors(error);
  }
  return error;
};

@Injectable({ providedIn: 'root' })
export class EmailAsyncValidator implements AsyncValidator {
  constructor(private readonly http: HttpClient) {}

  public validate = (control: AbstractControl) => this.emailValidator(control);

  private emailValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.http
      .get<boolean>(`/api/users/email-exists?email=${control.value}`)
      .pipe(map((exists) => (exists ? { email: 'Email already exists' } : null)));
  }
}
