import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: ` <button>{{ caption }}</button> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonAtom {
  @Input() caption = '';
}
