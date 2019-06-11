import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware as createRouterMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import thunk from 'redux-thunk'

import { rootReducer, RootState } from "./index";

export const history = createHistory();
export const routerMiddleware = createRouterMiddleware(history);

export function configureStore(initialState?: RootState) {
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  // configure middlewares
  const middlewares = [routerMiddleware, thunk];
  // compose enhancers
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  // create store
  return createStore(rootReducer, initialState!, enhancer);
}
