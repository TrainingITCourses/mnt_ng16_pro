import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  template: `
    <header>
      <h1>{{ title }}</h1>
    </header>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderBlock {
  @Input() title = '';
}
