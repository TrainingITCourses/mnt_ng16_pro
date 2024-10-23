import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LaunchDto } from '@app/models/launch.dto';
import { LaunchesAbstractRepository } from '@app/services/launches.repository';

@Injectable({
  providedIn: 'root',
})
export class LaunchService {
  constructor(private launchesRepository: LaunchesAbstractRepository) {}

  getLaunchById$(id: string): Observable<LaunchDto> {
    return this.launchesRepository.getLaunchById$(id);
  }
}
