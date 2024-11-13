import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AgencyDto } from '@app/models/agency.dto';
import { BookingDto } from '@app/models/booking.dto';
import { LaunchDto } from '@app/models/launch.dto';
import { RocketDto } from '@app/models/rocket.dto';
import { AgenciesRepository } from '@app/services/agencies.repository';
import { BookingsRepository } from '@app/services/bookings.repository';
import { LaunchesAbstractRepository } from '@app/services/launches.repository';
import { PassengersRepository } from '@app/services/passengers.repository';
import { RocketsRepository } from '@app/services/rockets.repository';

@Injectable({
  providedIn: 'root',
})
export class LaunchService {
  constructor(
    private launchesRepository: LaunchesAbstractRepository,
    private agenciesRepository: AgenciesRepository,
    private rocketsRepository: RocketsRepository,
    private bookingsRepository: BookingsRepository,
    private passengersRepository: PassengersRepository,
  ) {}

  getLaunchById$(id: string): Observable<LaunchDto> {
    return this.launchesRepository.getLaunchById$(id);
  }

  getAgencyById$(agencyId: string): Observable<AgencyDto> {
    return this.agenciesRepository.getById$(agencyId);
  }

  getRocketById$(rocketId: string): Observable<RocketDto> {
    return this.rocketsRepository.getById$(rocketId);
  }

  getBookingsByLaunchId$(launchId: string): Observable<BookingDto[]> {
    return this.bookingsRepository.getByLaunchId$(launchId);
  }
}
