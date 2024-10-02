import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.atom.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkAtom {
  @Input() href: string = '';
  @Input() target: string = '_self';
  @Input() link: string[] = [];
  @Input() text: string = '';
}
