import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LaunchDto } from '@app/models/launch.dto';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {
  @Input() nextLaunches: LaunchDto[] = [];
}
