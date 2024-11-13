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
/**
 * Search Block, displays a search input
 * - Emits the search term when the user types under certain conditions
 */
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

  /**
   * HTML Search Input Element Reference at the View
   */
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  /**
   * Hook After the View is initialized,
   * - it subscribes to the input event
   */
  ngAfterViewInit() {
    const nativeSearch = this.searchInput.nativeElement;
    // using fromEvent to create an observable from the input event
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
