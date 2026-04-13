import type { Store, Middleware } from 'redux';
import { createStore, applyMiddleware, compose } from 'redux';
import * as reduxThunkModule from 'redux-thunk';
import rootReducer from './reducer';
import type { RootState } from './types/state';
import { isProduction } from './const';

// Handle both ESM and CommonJS exports of redux-thunk
const thunk =
  (reduxThunkModule as any).default?.default ||
  (reduxThunkModule as any).default ||
  (reduxThunkModule as any).thunk ||
  reduxThunkModule;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (settings: unknown) => void;
  }
}

/**
 * Returns a new redux store.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (
  initialState: Record<string, unknown>,
  middleware: Middleware[] = []
): Store<RootState> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const v: any =
    !isProduction &&
      typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  return createStore(
    rootReducer,
    initialState,
    v(applyMiddleware(...middleware, thunk))
  );
};
