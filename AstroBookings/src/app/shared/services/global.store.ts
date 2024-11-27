import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Subscription } from 'rxjs';
import { GlobalAction, globalReducer, GlobalState, initialGlobalState } from './global.state';

/**
 * A global store that can gorw to manage the whole application state
 * @see globalState for the state definition
 */
@Injectable({ providedIn: 'root' })
export class GlobalStore {
  readonly #state$ = new BehaviorSubject<GlobalState>(initialGlobalState);

  private effects: Subscription[] = [];

  private actionEffectsMap: { [key: string]: ((value: GlobalState) => void)[] } = {};

  /**
   * Generic select method to get a projection of the state
   * @param selectFn The custom projection function
   * @returns The custom projection
   */
  select$<T>(selectFn: (state: any) => T) {
    return this.#state$.pipe(map(selectFn), distinctUntilChanged());
  }

  /**
   * Generic dispatch method to update the state
   * @param action The action to dispatch
   */
  dispatch(action: GlobalAction): void {
    this.#state$.next(globalReducer(this.#state$.value, action));
    if (this.actionEffectsMap[action.type]) {
      this.actionEffectsMap[action.type].forEach((effect) => effect(this.#state$.value));
    }
  }

  // Implement register effect method
  addEffect<T>(selectFn: (state: GlobalState) => T, effectFn: (value: T) => void): void {
    const trigger$ = this.select$(selectFn);
    this.effects.push(trigger$.subscribe(effectFn));
  }

  // Implement an effect on certain actions
  addEffectToAction(actionType: string, effectFn: (value: GlobalState) => void): void {
    if (!this.actionEffectsMap[actionType]) {
      this.actionEffectsMap[actionType] = [];
    }
    this.actionEffectsMap[actionType].push(effectFn);
  }

  ngOnDestroy(): void {
    this.effects.forEach((effect) => effect.unsubscribe());
    this.effects = [];
  }
}

// ToDo: Generalize the store to work with any state
