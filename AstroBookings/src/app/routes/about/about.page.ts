import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogService } from '@app/services/log.service';
import { AboutService } from './about.service';

@Component({
  templateUrl: './about.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LogService],
})
export class AboutPage {
  aboutInfo: string;

  constructor(
    private readonly aboutService: AboutService,
    private readonly logService: LogService,
  ) {
    this.aboutInfo = this.aboutService.getAboutInfo();
    this.logService.log('AboutPage loaded');
  }
}
