import { Component } from '@angular/core';
import { environment } from '@app/env/environment.development';
import { GlobalStore } from '@app/services/global.store';

@Component({
  selector: 'app-footer',
  styles: [
    `
      footer {
        background-color: #fff;
      }
    `,
  ],
  template: `
    <footer>
      <nav>
        <span>Environment: {{ environment | json }}</span>
        <span *ngIf="apiStatus$ | async as apiStatus">API Status: {{ apiStatus }}</span>
        <span *ngIf="lastApiError$ | async as lastApiError"
          >Last API Error: {{ lastApiError }}</span
        >
        <span *ngIf="lastApiRequestMs$ | async as lastApiRequestMs"
          >Last API Request Time: {{ lastApiRequestMs }}ms</span
        >
      </nav>
    </footer>
  `,
})
export class FooterWidget {
  environment = environment;
  apiStatus$ = this.globalStore.select$((state) => state.apiStatus);
  lastApiError$ = this.globalStore.select$((state) => state.lastApiError);
  lastApiRequestMs$ = this.globalStore.select$((state) => state.lastApiMs);

  constructor(private readonly globalStore: GlobalStore) {}
}
