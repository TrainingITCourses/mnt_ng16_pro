import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgencyDto } from '@app/models/agency.dto';
import { LaunchDto } from '@app/models/launch.dto';
import { concatMap, Observable } from 'rxjs';
import { LaunchService } from './launch.service';

@Component({
  templateUrl: './launch.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchPage {
  launchId: string = this.route.snapshot.paramMap.get('id') || '';
  launch$: Observable<LaunchDto> = this.launchService.getLaunchById$(this.launchId);

  agency$: Observable<AgencyDto> = this.launch$.pipe(
    concatMap((launch: LaunchDto) => this.launchService.getAgencyById$(launch.agencyId)),
  );

  constructor(private route: ActivatedRoute, private launchService: LaunchService) {}
}
