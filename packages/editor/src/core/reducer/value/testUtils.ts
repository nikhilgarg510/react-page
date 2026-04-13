import type { Action } from 'redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import * as reduxThunkModule from 'redux-thunk';
import type { Value } from '../../types/node';

// Handle both ESM and CommonJS exports of redux-thunk
const thunk =
  (reduxThunkModule as any).default?.default ||
  (reduxThunkModule as any).default ||
  (reduxThunkModule as any).thunk ||
  reduxThunkModule;

import { value } from './index';

export const simulateDispatch = (
  initialState: Value,
  action?: Action
): Value => {
  const reducer = combineReducers({ value });
  const store = createStore(
    reducer,
    { value: initialState },
    applyMiddleware(thunk)
  );
  if (action) store.dispatch(action);

  return store.getState().value;
};
