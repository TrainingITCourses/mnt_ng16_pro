import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LaunchDto } from '@app/models/launch.dto';
import { Observable } from 'rxjs';
import { HomeService } from './home.service';

@Component({
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  //nextLaunches: LaunchDto[] = [];
  nextLaunches$: Observable<LaunchDto[]> = this.homeService.loadNextLaunches$();
  constructor(public readonly homeService: HomeService) {
    //this.nextLaunches = this.homeService.loadNextLaunches();
  }
}
