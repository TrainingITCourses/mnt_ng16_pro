import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  template: `
    <input #searchInput type="search" [placeholder]="placeholder" [value]="currentSearchTerm" />
  `,
})
export class SearchBlock implements AfterViewInit {
  @Input() placeholder = 'search...';
  @Input() currentSearchTerm = '';

  @Output() search = new EventEmitter<string>();

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    const nativeSearch = this.searchInput.nativeElement;
    const inputSource$ = fromEvent(nativeSearch, 'input');
    inputSource$
      .pipe(
        map((event: Event) => event.target as HTMLInputElement),
        map((target: HTMLInputElement) => target.value),
        debounceTime(300),
        distinctUntilChanged(),
        filter((value) => value.length == 0 || value.length > 2),
        tap((value) => console.log('control: ' + value)),
      )
      .subscribe((term: string) => {
        this.search.emit(term);
      });
  }
}
