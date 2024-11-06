import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LaunchDto } from '@app/models/launch.dto';
import { LOG_SOURCE, LogService } from '@app/services/log.service';
import { map, Observable, switchMap, tap } from 'rxjs';
import { HomeService } from './home.service';

/**
 * Home Page, displays the home page
 * @requires HomeService to load the next launches
 * @requires LogService to log changes
 * @requires LOG_SOURCE to identify the source of the log
 */
@Component({
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: LOG_SOURCE,
      useValue: '🏠 Home Page',
    },
    LogService,
  ],
})
export class HomePage {
  nextLaunches$!: Observable<LaunchDto[]>;
  currentSearchTerm: string = '';
  constructor(
    private readonly homeService: HomeService,
    private readonly logService: LogService,
    private readonly router: Router,
    activatedRoute: ActivatedRoute,
  ) {
    this.logService.log('HomePage loaded');
    this.nextLaunches$ = activatedRoute.queryParams.pipe(
      map((params) => params['q'] || ''),
      tap((q) => (this.currentSearchTerm = q)),
      switchMap((q) => this.homeService.loadNextLaunches$(q)),
    );
  }

  onSearch(term: string) {
    if (typeof term !== 'string') return;
    this.logService.log('Page: Searching for: ' + term);
    //this.nextLaunches$ = this.homeService.loadNextLaunches$(term);
    this.router.navigate([], { queryParams: { q: term } });
  }
}
