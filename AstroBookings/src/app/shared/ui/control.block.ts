import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

/**
 * A component that renders a form control with a label and an input element and an error message if the control is invalid
 * - Needs a form, and formControlName as inputs
 * - Accepts label, placeholder, and type as inputs
 * - It also accepts arrayName, arrayIndex, and groupName inputs for nested arrays and groups
 */
@Component({
  selector: 'app-control',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ControlBlock),
      multi: true,
    },
  ],
  template: `
    <div>
      <label [for]="formControlName">
        {{ label || (formControlName | titlecase) }} <span *ngIf="hasError()">🚨</span>
      </label>
      <input
        [type]="type"
        [id]="formControlName"
        [name]="formControlName"
        [placeholder]="placeholder || label || formControlName"
        autocomplete="off"
        [value]="value"
        (input)="onInput($event)"
        [attr.aria-invalid]="getInvalid()"
      />
      <small *ngIf="getInvalid()">{{ getErrorMessage() }}</small>
    </div>
  `,
})
export class ControlBlock implements ControlValueAccessor {
  // Inputs
  /**
   * The form to which the control belongs
   * - This is mandatory!
   */
  @Input() form!: FormGroup;
  /**
   * The name of the control
   * - This is mandatory!
   */
  @Input() formControlName!: string;
  /**
   * The text for the label
   * - Defaults to the formControlName
   */
  @Input() label = '';
  /**
   * The placeholder used as a hint
   * - Defaults to the label or formControlName
   */
  @Input() placeholder = '';
  /**
   * The type of the control
   * - Defaults to 'text'
   */
  @Input() type = 'text';

  // Group and array inputs
  /**
   * The name of the array to search for the control
   * - Optional, only for sub-arrays
   */
  @Input() arrayName?: string;
  /**
   * The index of the control in the array
   * - Optional, only for sub-arrays
   */
  @Input() arrayIndex?: number;
  /**
   * The name of the group to search for the control
   * - Optional, only for nested groups
   */
  @Input() groupName?: string;

  /**
   * The current value of the control
   */
  value: unknown;

  /**
   * The function to emit the change event
   */
  private changeCallBack: any;
  /**
   * The function to emit the touch event
   */
  private touchCallBack: any;

  constructor() {}

  // ControlValueAccessor methods

  /**
   * Stores the value of the control
   * - This method is called by the ReactiveFormsModule when the value changes programmatically
   * @param newValue - The value to store
   */
  writeValue(newValue: any): void {
    this.value = newValue;
  }

  /**
   * Stores a function to be called when the control value changes
   * - This method is called once by the ReactiveFormsModule when the component is initialized
   * @param changeCallBack - The function to emit the change event
   */
  registerOnChange(changeCallBack: any): void {
    this.changeCallBack = changeCallBack;
  }

  /**
   * Stores a function to be called when the control is touched
   * - This method is called once by the ReactiveFormsModule when the component is initialized
   * @param touchCallBack - The function to emit the touch event
   */
  registerOnTouched(touchCallBack: any): void {
    this.touchCallBack = touchCallBack;
  }

  // Event handlers

  /**
   * The event handler for the input event
   * - notifies the ReactiveFormsModule that the value has changed
   * @param event - The InputEvent to handle
   */
  onInput(event: any) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this.value = target.value;
    this.changeCallBack(this.value);
    this.touchCallBack();
  }

  // Utility methods

  /**
   * Checks if the control has an error
   * @returns true if the control has an error, false otherwise
   */
  hasError() {
    return this.getControl().invalid;
  }
  /**
   * Checks if the control should be treated as invalid
   * @returns undefined if the control is pristine, true if the control is invalid, false otherwise
   */
  getInvalid(): boolean | undefined {
    if (this.getControl().pristine) {
      // user has not interacted with the control yet
      return undefined;
    }
    return this.getControl().invalid;
  }
  /**
   * Gets the error message of the control
   * @returns the error message of the control
   */
  getErrorMessage() {
    return JSON.stringify(this.getControl().errors || {});
  }
  /**
   * Gets the control based on the path at the form
   * - uses the arrayName, arrayIndex, groupName and formControlName to build the path
   * @returns the control
   */
  private getControl() {
    const controlPath = [];
    if (this.arrayName !== undefined) controlPath.push(this.arrayName);
    if (this.arrayIndex !== undefined) controlPath.push(this.arrayIndex);
    if (this.groupName !== undefined) controlPath.push(this.groupName);
    controlPath.push(this.formControlName);
    let control: AbstractControl | null = this.form.get(controlPath);
    if (!control) {
      throw new Error(`Control ${controlPath} not found`);
    }
    return control;
  }
}
