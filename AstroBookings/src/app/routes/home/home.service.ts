import { Injectable } from '@angular/core';
import { LaunchDto } from '@app/models/launch.dto';
import { LaunchesAbstractRepository } from '@app/services/launches.repository';
import { map, Observable } from 'rxjs';

/**
 * Home Service, loads the next launches
 * @requires LaunchesRepository to load the launches
 * @requires LogService to log changes
 */
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private readonly launchesRepository: LaunchesAbstractRepository) {}

  loadNextLaunches$(searchTerm: string): Observable<LaunchDto[]> {
    console.log('Service, Searching for: ' + searchTerm);
    return this.launchesRepository
      .getLaunchesByStatus$('scheduled')
      .pipe(map((launches) => this.filterBySearchTerm(launches, searchTerm)));
  }

  filterBySearchTerm(launches: LaunchDto[], searchTerm: string): LaunchDto[] {
    if (!searchTerm) return launches;
    return launches.filter((launch) => this.bySearchTerm(launch, searchTerm));
  }

  bySearchTerm(launch: LaunchDto, searchTerm: string) {
    const mission = launch.mission.toLowerCase();
    const destination = launch.destination.toLowerCase();
    const termsArray = [mission, destination];
    const searchTermLower = searchTerm.toLowerCase();
    return termsArray.some((term) => term.includes(searchTermLower));
  }
}
