import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgencyDto } from '@app/models/agency.dto';
import { BookingDto } from '@app/models/booking.dto';
import { LaunchDto } from '@app/models/launch.dto';
import { PassengerDto } from '@app/models/passenger.dto';
import { RocketDto } from '@app/models/rocket.dto';
import {
  concatMap,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { LaunchService } from './launch.service';

type RocketWitBookings = {
  rocket: RocketDto;
  bookings: BookingDto[];
};
/**
 * A routed component that displays a launch and its related data
 * - gets the launchId from the route snapshot
 * @requires `ActivatedRoute` to get the launchId from the route snapshot
 * @requires `LaunchService` to get the launch, agency, rocket, bookings, and passengers
 *
 */
@Component({
  templateUrl: './launch.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchPage {
  /**
   * The launchId from the route snapshot
   */
  private readonly launchId: string = this.route.snapshot.params['id'] || '';

  /**
   * Observable of LaunchDto loaded from the launchId
   * - uses `shareReplay` to avoid multiple requests
   */
  launch$: Observable<LaunchDto> = this.launchService
    .getLaunchById$(this.launchId)
    .pipe(shareReplay());

  /**
   * Observable of AgencyDto loaded from the agencyId, when the launchDto is loaded
   * - uses `concatMap` to wait for the launchDto to be loaded
   */
  agency$: Observable<AgencyDto> = this.launch$.pipe(
    // Get the agency from the launchId, when the launchDto is loaded
    concatMap((launch: LaunchDto) => this.launchService.getAgencyById$(launch.agencyId)),
  );

  /**
   * Observable of RocketDto and BookingDto[] from the launchId, when the launchDto is loaded
   * - uses `concatMap` to wait for the launchDto to be loaded
   * - then uses `forkJoin` to load in parallel the rocketDto and bookingsDto
   */
  rocketAndBookings$: Observable<RocketWitBookings> = this.launch$.pipe(
    concatMap((launch: LaunchDto) =>
      forkJoin({
        rocket: this.launchService.getRocketById$(launch.rocketId),
        bookings: this.launchService.getBookingsByLaunchId$(launch.id),
      }),
    ),
    // share the observable to avoid multiple requests
    shareReplay(),
  );

  /**
   * Observable of the available seats for the launch, when the rocket and bookings are loaded
   * - uses `map` to compute the available seats
   */
  availableSeats$: Observable<number> = this.rocketAndBookings$.pipe(
    map((rocketWithBookings: RocketWitBookings) => {
      const capacity = rocketWithBookings.rocket.capacity;
      const bookings = rocketWithBookings.bookings;
      const seatsBooked = bookings.reduce((acc, curr) => acc + curr.numberOfSeats, 0);
      return capacity - seatsBooked;
    }),
  );

  /**
   * Observable of an array of passengersIds
   * - got from the bookings, when the rocket and bookings are loaded
   */
  passengersId$: Observable<string[]> = this.rocketAndBookings$.pipe(
    map((rocketWithBookings: RocketWitBookings) =>
      rocketWithBookings.bookings.flatMap((booking) => booking.passengers),
    ),
  );

  /**
   * Observable of a PassengerDto, when the passengersId$ is loaded
   * - uses `switchMap` to wait for the passengersId$ to be loaded
   * - uses `mergeMap` to load in parallel the passengersDto
   * - uses `tap` to store the passengersDto in the component array
   * - This is a hot observable, so it will emit values as soon as they are loaded
   */
  passengersDto$: Observable<PassengerDto> = this.passengersId$.pipe(
    switchMap((passengersIds: string[]) =>
      from(passengersIds).pipe(
        // parallel loading of the passengersDto for each passengerId
        mergeMap((passengerId: string) => this.launchService.getPassengerById$(passengerId)),
        // Store the result in the component array of passengers
        tap((passenger: PassengerDto) => {
          // changes the reference of the array of passengers to trigger the change detection
          this.passengers = [...this.passengers, passenger];
          // marks the component for check to update the view
          this.cd.markForCheck();
        }),
      ),
    ),
  );

  /**
   * Array of passengers, filled when the passengersId array is loaded
   * - is not observable, so the view is not updated when the array changes
   * - the reference must change to trigger the change detection
   */
  passengers: PassengerDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private launchService: LaunchService,
    private cd: ChangeDetectorRef,
  ) {}
}
