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
 * A component that renders a search input
 * - Emits a search event with the search term
 * - uses the input event as an observable source
 * - Debounces the search term for 300ms
 * - Only emits if the search term has changed
 * - Filters out short search terms (less than 3 characters)
 * - Emits an empty string if the search term is empty
 * - Uses RxJS operators to debounce, filter, and emit the search term
 */
@Component({
  selector: 'app-search',
  template: `<input
    #searchInput
    type="search"
    [placeholder]="placeholder"
    [value]="currentSearchTerm"
  />`,
})
export class SearchBlock implements AfterViewInit {
  // Inputs
  /**
   * The text for the search input placeholder
   */
  @Input() placeholder = 'Search';

  /**
   * The current search term, can be set by the parent component
   */
  @Input() currentSearchTerm: string = '';

  // Outputs
  /**
   * Emits the search term
   */
  @Output() search = new EventEmitter<string>();

  // ViewChild

  /**
   * The search input element on the template
   */
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  // Event Handlers

  /**
   * When the view is initialized,
   * - subscribe to the input event
   * - emit the search term
   */
  ngAfterViewInit() {
    // creates an observable source from the input event
    const inputSource$ = fromEvent(this.searchInput.nativeElement, 'input');
    // pipe the observable source through a series of RxJS operators
    inputSource$
      .pipe(
        map((event: any) => event.target as HTMLInputElement),
        map((target: HTMLInputElement) => target.value.trim()),
        debounceTime(300), // to avoid too many requests
        distinctUntilChanged(), // to avoid the same value multiple times
        filter((term) => term.length === 0 || term.length >= 3), // to avoid short search terms
        tap((term) => console.log(`fromEvent Search Term: ${term}`)),
        tap((term) => this.search.emit(term)),
      )
      .subscribe();
  }
}
