import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LogService } from '@app/services/log.service';

@Component({
  selector: 'app-about-content',
  templateUrl: './about-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutContentComponent {
  @Input() info: string = '';
  constructor(private readonly logService: LogService) {
    this.logService.log('AboutContentComponent initialized');
  }
}
