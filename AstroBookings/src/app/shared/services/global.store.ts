import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { GlobalAction, globalReducer, GlobalState, initialGlobalState } from './global.state';

/**
 * A global store that can gorw to manage the whole application state
 * @see globalState for the state definition
 */
@Injectable({ providedIn: 'root' })
export class GlobalStore {
  readonly #state$ = new BehaviorSubject<GlobalState>(initialGlobalState);

  /**
   * Generic select method to get a projection of the state
   * @param selectFn The custom projection function
   * @returns The custom projection
   */
  select<T>(selectFn: (state: any) => T) {
    return this.#state$.pipe(map(selectFn), distinctUntilChanged());
  }

  /**
   * Generic dispatch method to update the state
   * @param action The action to dispatch
   */
  dispatch(action: GlobalAction): void {
    this.#state$.next(globalReducer(this.#state$.value, action));
  }

  // ToDo: Implement register effect method
}

// ToDo: Generalize the store to work with any state
