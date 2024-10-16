import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LaunchDto } from '@app/models/launch.dto';
import { LOG_SOURCE, LogService } from '@app/services/log.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styles: [],
  providers: [
    {
      provide: LOG_SOURCE,
      useValue: '🧠 Banner Component',
    },
    LogService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {
  @Input() nextLaunches: LaunchDto[] = [];

  constructor(private readonly logService: LogService) {
    this.logService.log('BannerComponent loaded');
  }
}
