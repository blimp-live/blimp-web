import * as React from "react";
import * as ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import './index.css';
import { Provider } from "react-redux";
import { configureStore, history } from "./reducers/store";
import { ConnectedRouter } from "react-router-redux";

import App from './App';

const store = configureStore();
(window as any).store = store;

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history} store={store}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
