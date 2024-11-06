import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BookingDto } from '@app/models/booking.dto';
import { LaunchDto } from '@app/models/launch.dto';
import { PassengerDto } from '@app/models/passenger.dto';

/**
 * A component that renders a form for booking a launch
 * - Needs a launch object as input
 * - Emits a booking and passengers when the form is submitted
 */
@Component({
  selector: 'app-bookings-form',
  template: `
    <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()">
      <app-control
        [form]="bookingForm"
        formControlName="numberOfSeats"
        type="number"
        min="1"
        (change)="onSeatsChange()"
      />
      <ng-container *ngIf="bookingForm.value.numberOfSeats || 0 > 0" formArrayName="passengers">
        <div *ngFor="let passengerForm of passengers.controls; let i = index">
          <h3>Passenger {{ i + 1 }}</h3>
          <ng-container [formGroupName]="i">
            <app-control
              [form]="bookingForm"
              arrayName="passengers"
              [arrayIndex]="i"
              formControlName="contactPhone"
            />
            <app-control
              [form]="bookingForm"
              type="email"
              arrayName="passengers"
              [arrayIndex]="i"
              formControlName="contactEmail"
            />
            <app-control
              [form]="bookingForm"
              arrayName="passengers"
              [arrayIndex]="i"
              formControlName="emergencyContact"
            />
            <article formGroupName="travelPreferences">
              <app-control
                [form]="bookingForm"
                arrayName="passengers"
                [arrayIndex]="i"
                groupName="travelPreferences"
                formControlName="preferredDestination"
              />
              <app-control
                [form]="bookingForm"
                arrayName="passengers"
                [arrayIndex]="i"
                groupName="travelPreferences"
                formControlName="dietaryRestrictions"
              />
            </article>
          </ng-container>
        </div>
      </ng-container>
      <button type="submit" [disabled]="bookingForm.invalid">Book Now</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsFormComponent {
  // Inputs
  /**
   * The launch to book
   */
  @Input() launch!: LaunchDto;
  // Outputs
  /**
   * Emits a booking and passengers when the form is submitted
   */
  @Output() book = new EventEmitter<{
    booking: Partial<BookingDto>;
    passengers: Partial<PassengerDto>[];
  }>();

  /**
   * The form for the booking
   * - Has a number of seats control
   * - Has a passengers array control
   */
  bookingForm = this.formBuilder.group({
    numberOfSeats: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(10)]),
    passengers: this.formBuilder.array([]),
  });

  // Controls getters

  get numberOfSeats(): AbstractControl {
    return this.bookingForm.get('numberOfSeats')!;
  }

  get passengers(): FormArray {
    return this.bookingForm.get('passengers') as FormArray;
  }

  constructor(private readonly formBuilder: FormBuilder) {}

  // Event handlers

  /**
   * Adds or removes passenger forms to the passengers array based on the number of seats
   */
  onSeatsChange(): void {
    const seats = this.numberOfSeats.value || 0;
    const currentForms = this.passengers.length;

    if (seats > currentForms) {
      for (let i = currentForms; i < seats; i++) {
        this.addPassengerForm();
      }
    } else if (seats < currentForms) {
      for (let i = currentForms; i > seats; i--) {
        this.passengers.removeAt(i - 1);
      }
    }
  }

  /**
   * Submits the form
   */
  onSubmit(): void {
    if (this.bookingForm.invalid) return;
    const numberOfSeats = this.numberOfSeats.value || 0;
    if (numberOfSeats === 0) return;
    const formValue = this.bookingForm.value;
    const booking: Partial<BookingDto> = {
      launchId: this.launch.id,
      numberOfSeats,
      status: 'pending',
      totalPrice: this.launch.pricePerSeat * numberOfSeats,
      passengers: [], // IDs will be assigned after passenger creation
    };
    const newBooking = {
      booking,
      passengers: formValue.passengers as Partial<PassengerDto>[],
    };
    console.log('🚀 newBooking', newBooking);
    this.book.emit(newBooking);
  }

  /**
   * Adds a new passenger form to the passengers array
   */
  private addPassengerForm(): void {
    const newPassengerForm = this.formBuilder.group({
      contactPhone: ['', [Validators.required]],
      contactEmail: ['', [Validators.required, Validators.email]],
      emergencyContact: [''],
      travelPreferences: this.formBuilder.group({
        preferredDestination: [''],
        dietaryRestrictions: [''],
      }),
    });
    this.passengers.push(newPassengerForm);
  }
}
