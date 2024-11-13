import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgencyDto } from '@app/models/agency.dto';
import { BookingDto } from '@app/models/booking.dto';
import { LaunchDto } from '@app/models/launch.dto';
import { RocketDto } from '@app/models/rocket.dto';
import { concatMap, forkJoin, map, Observable } from 'rxjs';
import { LaunchService } from './launch.service';

type RocketWitBookings = {
  rocket: RocketDto;
  bookings: BookingDto[];
};

@Component({
  templateUrl: './launch.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchPage {
  launchId: string = this.route.snapshot.paramMap.get('id') || '';
  launch$: Observable<LaunchDto> = this.launchService.getLaunchById$(this.launchId);

  agency$: Observable<AgencyDto> = this.launch$.pipe(
    concatMap((launch: LaunchDto) => this.launchService.getAgencyById$(launch.agencyId)),
  );

  rocketWithBookings$: Observable<RocketWitBookings> = this.launch$.pipe(
    concatMap((launch: LaunchDto) =>
      forkJoin({
        rocket: this.launchService.getRocketById$(launch.rocketId),
        bookings: this.launchService.getBookingsByLaunchId$(launch.id),
      }),
    ),
  );

  availableSeats$: Observable<number> = this.rocketWithBookings$.pipe(
    map((rocketWithBookings: RocketWitBookings) => {
      let availableSeats = 0;
      const capacity = rocketWithBookings.rocket.capacity;
      let bookedSeats = rocketWithBookings.bookings.reduce(
        (acc, booking) => acc + booking.numberOfSeats,
        0,
      );
      availableSeats = capacity - bookedSeats;
      return availableSeats;
    }),
  );

  constructor(private route: ActivatedRoute, private launchService: LaunchService) {}
}
