import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LaunchDto } from '@app/models/launch.dto';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LaunchService } from './launch.service';

@Component({
  templateUrl: './launch.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchPage {
  launchId: string;
  launch$!: Observable<LaunchDto>;
  isWorking$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | undefined>(undefined);
  constructor(private route: ActivatedRoute, private launchService: LaunchService) {
    this.launchId = this.route.snapshot.paramMap.get('id') || '';
    this.isWorking$.next(true);
    this.launch$ = this.launchService.getLaunchById$(this.launchId).pipe(
      tap({
        next: () => this.isWorking$.next(false),
        error: (error) => {
          this.isWorking$.next(false);
          this.error$.next(error.statusText || error.message || 'Unknown error');
        },
      }),
    );
  }
}
