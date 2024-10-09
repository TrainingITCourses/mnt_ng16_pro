import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LaunchDto } from 'src/app/shared/models/launch.dto';
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
