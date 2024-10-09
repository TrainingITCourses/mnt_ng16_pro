import { Injectable } from '@angular/core';
import { LaunchDto } from 'src/app/shared/models/launch.dto';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor() {}
  loadNextLaunches(): LaunchDto[] {
    return [
      {
        id: '1',
        agencyId: '1',
        rocketId: '1',
        date: new Date(),
        mission: 'Mission 1',
        destination: 'Destination 1',
        pricePerSeat: 100,
        status: 'scheduled',
      },
      {
        id: '2',
        agencyId: '2',
        rocketId: '2',
        date: new Date(),
        mission: 'Mission 2',
        destination: 'Destination 2',
        pricePerSeat: 200,
        status: 'scheduled',
      },
    ];
  }
}
