import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-about-content',
  templateUrl: './about-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutContentComponent {
  @Input() info: string = '';
}
