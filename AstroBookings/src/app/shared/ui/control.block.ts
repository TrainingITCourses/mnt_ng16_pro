import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-control',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ControlBlock), multi: true },
  ],
  template: `
    <div>
      <label [for]="formControlName">{{ label }}:</label>
      <input
        [type]="type"
        [id]="formControlName"
        [attr.aria-invalid]="invalid"
        [value]="value"
        (input)="onInput($event)"
      />
      <small *ngIf="mustDisplayError()" class="error">{{ getDisplayError() }}</small>
    </div>
  `,
})
export class ControlBlock implements ControlValueAccessor {
  @Input() label = '';
  @Input() type = 'text';
  @Input() formControlName: string = '';
  value: any;
  private changeCb: any;
  touchCb: any;
  get invalid(): boolean {
    return this.getControl().invalid;
  }
  /**
   * Framework calls this method when the value of the control changes
   * @param value the new value
   */
  writeValue(value: any): void {
    this.value = value;
  }
  /**
   * The framework calls this method on start with a callback function that should be called when the value of the control changes
   * @param fn the callback function to register on UI change
   */
  registerOnChange(changeCb: any): void {
    this.changeCb = changeCb;
  }
  registerOnTouched(fn: any): void {
    this.touchCb = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // TODO
  }

  onInput(event: Event): void {
    const newValue = event.target ? (event.target as HTMLInputElement).value : null;
    this.value = newValue;
    this.changeCb(newValue);
  }

  mustDisplayError(): boolean {
    const control = this.getControl();
    return control.invalid && control.touched;
  }

  getDisplayError(): string {
    const control = this.getControl();
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
  getControl(): AbstractControl {
    return new FormControl('');
  }
}
