import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AgencyDto } from '@app/models/agency.dto';
import { LaunchDto } from '@app/models/launch.dto';
import { AgenciesRepository } from '@app/services/agencies.repository';
import { LaunchesAbstractRepository } from '@app/services/launches.repository';

@Injectable({
  providedIn: 'root',
})
export class LaunchService {
  constructor(
    private launchesRepository: LaunchesAbstractRepository,
    private agenciesRepository: AgenciesRepository,
  ) {}

  getLaunchById$(id: string): Observable<LaunchDto> {
    return this.launchesRepository.getLaunchById$(id);
  }

  getAgencyById$(agencyId: string): Observable<AgencyDto> {
    return this.agenciesRepository.getById$(agencyId);
  }
}
