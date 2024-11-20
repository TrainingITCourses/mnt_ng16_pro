import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { GlobalAction, globalReducer, GlobalState, initialGlobalState } from './global.state';

@Injectable({ providedIn: 'root' })
export class GlobalStore {
  readonly #state$ = new BehaviorSubject<GlobalState>(initialGlobalState);

  select<T>(selectFn: (state: any) => T) {
    return this.#state$.pipe(map(selectFn), distinctUntilChanged());
  }

  dispatch(action: GlobalAction): void {
    this.#state$.next(globalReducer(this.#state$.value, action));
  }

  // ToDo: Implement register effect method
}

// ToDo: Generalize the store to work with any state
