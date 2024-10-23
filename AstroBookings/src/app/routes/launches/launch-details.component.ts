import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LaunchDto } from '@app/models/launch.dto';

@Component({
  selector: 'app-launch-details',
  templateUrl: './launch-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchDetailsComponent {
  @Input() launch!: LaunchDto;
}
