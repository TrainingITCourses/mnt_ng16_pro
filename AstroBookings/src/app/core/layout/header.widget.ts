import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
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
    { label: 'Login', path: ['/login'] },
    { label: 'Register', path: ['/register'] },
  ];
}
