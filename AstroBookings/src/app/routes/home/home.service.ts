import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LaunchDto } from 'src/app/shared/models/launch.dto';
import { LaunchesRepository } from 'src/app/shared/services/launches.repository';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private readonly launchesRepository: LaunchesRepository) {}

  loadNextLaunches$(): Observable<LaunchDto[]> {
    return this.launchesRepository.getNextLaunches$();
  }
}
