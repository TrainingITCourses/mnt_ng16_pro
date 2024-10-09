import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer>
      <nav>
        <span>Add a footer component with author and year</span>
      </nav>
    </footer>
  `,
})
export class FooterWidget {}
