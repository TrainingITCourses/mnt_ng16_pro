import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LaunchDto } from '@app/models/launch.dto';
import { Observable } from 'rxjs';
import { LaunchService } from './launch.service';

@Component({
  templateUrl: './launch.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchPage {
  launchId: string;
  source$!: Observable<LaunchDto>;

  constructor(private route: ActivatedRoute, private launchService: LaunchService) {
    this.launchId = this.route.snapshot.paramMap.get('id') || '';
    this.source$ = this.launchService.getLaunchById$(this.launchId);
  }
}
