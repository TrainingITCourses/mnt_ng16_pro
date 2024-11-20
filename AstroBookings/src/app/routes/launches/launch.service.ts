import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AgencyDto } from '@app/models/agency.dto';
import { BookingDto } from '@app/models/booking.dto';
import { LaunchDto } from '@app/models/launch.dto';
import { PassengerDto } from '@app/models/passenger.dto';
import { RocketDto } from '@app/models/rocket.dto';
import { AgenciesRepository } from '@app/services/agencies.repository';
import { BookingsRepository } from '@app/services/bookings.repository';
import { LaunchesAbstractRepository } from '@app/services/launches.repository';
import { PassengersRepository } from '@app/services/passengers.repository';
import { RocketsRepository } from '@app/services/rockets.repository';

/**
 * Service to get data for the launch page
 * @requires LaunchesRestRepository to get the launch data
 * @requires AgenciesRepository to get the agency data
 * @requires RocketsRepository to get the rocket data
 * @requires BookingsRepository to get the bookings data
 * @requires PassengersRepository to get the passengers data
 */
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

  /**
   * Get the launch data by id
   * @param id - The id of the launch
   * @returns An observable of the launch data
   */
  getLaunchById$(id: string): Observable<LaunchDto> {
    return this.launchesRepository.getById$(id);
  }

  /**
   * Get the agency data by id
   * @param agencyId - The id of the agency
   * @returns An observable of the agency data
   */
  getAgencyById$(agencyId: string): Observable<AgencyDto> {
    return this.agenciesRepository.getById$(agencyId);
  }

  /**
   * Get the rocket data by id
   * @param rocketId - The id of the rocket
   * @returns An observable of the rocket data
   */
  getRocketById$(rocketId: string): Observable<RocketDto> {
    return this.rocketsRepository.getById$(rocketId);
  }

  /**
   * Get the bookings data by launch id
   * @param launchId - The id of the launch
   * @returns An observable of the bookings data
   */
  getBookingsByLaunchId$(launchId: string): Observable<BookingDto[]> {
    return this.bookingsRepository.getByLaunchId$(launchId);
  }

  /**
   * Get the passenger data by id
   * @param passengerId - The id of the passenger
   * @returns An observable of the passenger data
   */
  getPassengerById$(passengerId: string): Observable<PassengerDto> {
    return this.passengersRepository.getById$(passengerId);
  }
}
