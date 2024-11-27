import { Injectable } from '@angular/core';
import { Store } from '@app/services/generic.store';

type RouterState = {
  url: string;
  previousUrl: string;
  navigationCount: number;
};

const initialState: RouterState = {
  url: '',
  previousUrl: '',
  navigationCount: 0,
};

type RouterAction = {
  type: 'NAVIGATE';
  payload: string;
};

function routerReducer(state: RouterState, action: RouterAction): RouterState {
  switch (action.type) {
    case 'NAVIGATE':
      return {
        previousUrl: state.url,
        url: action.payload,
        navigationCount: state.navigationCount + 1,
      };
    default:
      return { ...state };
  }
}

@Injectable({
  providedIn: 'root',
})
export class RouterStore extends Store<RouterState, RouterAction> {
  constructor() {
    super(initialState, routerReducer);
  }
}
