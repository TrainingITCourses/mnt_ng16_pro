import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list',
  template: `
    <ng-container *ngIf="data.length > 0; else empty">
      <ng-content></ng-content>
      <section [style]="listStyle">
        <ng-container *ngFor="let item of data">
          <ng-container *ngTemplateOutlet="template; context: { $implicit: item }"> </ng-container>
        </ng-container>
      </section>
    </ng-container>
    <ng-template #empty>
      <input readonly type="text" name="empty" value="No data found" />
    </ng-template>
  `,
})
export class ListBlock {
  @Input() data!: unknown[];
  @Input() template!: TemplateRef<unknown>;
  @Input() listStyle =
    'display: grid; grid-template-columns: repeat(auto-fill, minmax(512px, 1fr)); gap: 16px';
}
