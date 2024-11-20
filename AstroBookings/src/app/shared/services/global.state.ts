import { UserTokenDto } from '@app/models/user-token.dto';

export type GlobalState = {
  userToken: UserTokenDto | undefined;
  lastApiError: string;
  lastApiMs: number;
  apiStatus: ApiStatus;
};

export const initialGlobalState: GlobalState = {
  userToken: undefined,
  lastApiError: '',
  lastApiMs: 0,
  apiStatus: 'idle',
};

type UserAction = { type: 'login'; payload: UserTokenDto } | { type: 'logout' };

type ApiLoadingAction = { type: 'apiLoading' };
type ApiErrorAction = { type: 'apiError'; payload: string };
type ApiApiCompleteAction = { type: 'apiComplete'; payload: number };

type ApiStatus = 'idle' | 'loading' | 'error' | 'complete';
type ApiAction = ApiErrorAction | ApiApiCompleteAction | ApiLoadingAction;

export type GlobalAction = UserAction | ApiAction;

export function globalReducer(state: GlobalState, action: GlobalAction): GlobalState {
  switch (action.type) {
    case 'login':
      return { ...state, userToken: action.payload };
    case 'logout':
      return { ...state, userToken: undefined };
    case 'apiLoading':
      return { ...state, apiStatus: 'loading' };
    case 'apiError':
      return { ...state, lastApiError: action.payload, apiStatus: 'error' };
    case 'apiComplete':
      return { ...state, lastApiMs: action.payload, apiStatus: 'complete' };
    default:
      return { ...state };
  }
}
