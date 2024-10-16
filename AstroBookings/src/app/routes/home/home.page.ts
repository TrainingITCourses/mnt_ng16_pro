import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LaunchDto } from '@app/models/launch.dto';
import { Observable } from 'rxjs';
import { HomeService } from './home.service';

@Component({
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  nextLaunches$: Observable<LaunchDto[]> = this.homeService.loadNextLaunches$();
  constructor(private readonly homeService: HomeService) {}
}
