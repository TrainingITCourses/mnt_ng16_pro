import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LaunchDto } from '@app/models/launch.dto';
import { LOG_SOURCE, LogService } from '@app/services/log.service';
import { Observable } from 'rxjs';
import { HomeService } from './home.service';

@Component({
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: LOG_SOURCE,
      useValue: '🏠 Home Page',
    },
    LogService,
  ],
})
export class HomePage {
  nextLaunches$: Observable<LaunchDto[]> = this.homeService.loadNextLaunches$();

  constructor(private readonly homeService: HomeService, private readonly logService: LogService) {
    this.logService.log('HomePage loaded');
    this.doThings();
  }

  doThings() {
    this.logService.log('Doing things');
  }
}
