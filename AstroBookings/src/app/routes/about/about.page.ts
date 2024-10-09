import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutService } from './about.service';

@Component({
  templateUrl: './about.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  aboutInfo: string;

  constructor(private readonly aboutService: AboutService) {
    this.aboutInfo = this.aboutService.getAboutInfo();
  }
}
