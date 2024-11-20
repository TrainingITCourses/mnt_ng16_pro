import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UsersStore } from '@app/services/users.store';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header>
      <nav>
        <ul>
          <h1><app-link [link]="['/']" [text]="appTitle"></app-link></h1>
        </ul>
        <ul>
          <li *ngFor="let link of links">
            <app-link [link]="link.path" [text]="link.label"></app-link>
          </li>
          <ng-container *ngIf="isLoggedIn$ | async as isLoggedIn; else anonymousTemplate">
            <span role="button" class="outline secondary" (click)="logout()">Logout</span>
          </ng-container>
          <ng-template #anonymousTemplate>
            <li *ngFor="let link of anonymousLinks">
              <app-link [link]="link.path" [text]="link.label"></app-link>
            </li>
          </ng-template>
        </ul>
      </nav>
    </header>
  `,
})
export class HeaderWidget {
  appTitle = 'AstroBookings';

  links = [
    { label: 'Home', path: ['/'] },
    { label: 'About', path: ['/about'] },
  ];
  anonymousLinks = [
    { label: 'Login', path: ['/login'] },
    { label: 'Register', path: ['/register'] },
  ];

  isLoggedIn$ = this.userStore.selectIsLoggedIn$;

  constructor(private readonly userStore: UsersStore) {}

  logout(): void {
    this.userStore.dispatch('logout', undefined);
  }
}
