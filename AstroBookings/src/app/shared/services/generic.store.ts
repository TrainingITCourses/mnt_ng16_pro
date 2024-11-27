import { BehaviorSubject, distinctUntilChanged, map, Subscription } from 'rxjs';

interface Action {
  type: string;
  payload?: any;
}

export class Store<T, A extends Action> {
  readonly #state$: BehaviorSubject<T>;
  readonly reducer: (state: T, action: any) => T;

  private effects: Subscription[] = [];

  constructor(initialState: T, reducer: (state: T, action: any) => T) {
    this.#state$ = new BehaviorSubject<T>(initialState);
    this.reducer = reducer;
  }

  select$<K>(selectFn: (state: T) => K) {
    return this.#state$.pipe(map(selectFn), distinctUntilChanged());
  }

  dispatch(action: A): void {
    const currentState = this.#state$.value;
    const newState = this.reducer(currentState, action);
    this.#state$.next(newState);
  }

  addEffect<K>(selectFn: (state: T) => K, effectFn: (value: K) => void): void {
    const trigger$ = this.select$(selectFn);
    this.effects.push(trigger$.subscribe(effectFn));
  }
}
