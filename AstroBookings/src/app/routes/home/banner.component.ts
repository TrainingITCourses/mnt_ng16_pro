import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LaunchDto } from '@app/models/launch.dto';
import { LOG_SOURCE, LogService } from '@app/services/log.service';
/**
 * Banner Component, displays a banner with the next launch
 * @param nextLaunches - The next launches to display
 * @requires LogService to log changes
 * @requires LOG_SOURCE to identify the source of the log
 */
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styles: [],
  providers: [
    {
      provide: LOG_SOURCE,
      useValue: '🪧 Banner Component',
    },
    LogService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent implements OnChanges {
  @Input() nextLaunches: LaunchDto[] = [];

  constructor(private readonly logService: LogService) {
    this.logService.log('BannerComponent loaded');
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.logService.log(`Received ${changes['nextLaunches'].currentValue.length} launches`);
  }
}
