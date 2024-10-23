import { Component, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-async',
  template: `
    <ng-container *ngIf="data$ | async as dataResult">
      <ng-container *ngTemplateOutlet="dataTemplate; context: { $implicit: dataResult }">
      </ng-container>
    </ng-container>
    <aside *ngIf="isWorking$ | async" aria-busy="true">Loading...</aside>
    <input *ngIf="error$ | async as error" readonly [value]="error" aria-invalid="true" />
  `,
})
export class AsyncBlock implements OnChanges {
  @Input() source$!: Observable<unknown>;
  @Input() dataTemplate!: TemplateRef<unknown>;
  data$!: Observable<unknown>;
  isWorking$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | undefined>(undefined);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['source$']) {
      this.isWorking$.next(true);
      this.data$ = this.source$.pipe(
        tap({
          complete: () => this.isWorking$.next(false),
          error: (error) => {
            this.isWorking$.next(false);
            this.error$.next(error.statusText || error.message || 'Unknown error');
          },
        }),
      );
    }
  }
}
