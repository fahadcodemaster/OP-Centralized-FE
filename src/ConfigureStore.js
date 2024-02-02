// @ts-ignore
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { routerMiddleware, routerReducer } from "react-router-redux";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";

import reducers from "./Redux/Reducers/index";
const createHistory = require("history");

function ConfiureStore(initialState) {
  const history = createHistory.createBrowserHistory();
  const routeMiddleware = routerMiddleware(history);
  const middlewares = [thunk, routeMiddleware];

  const composeEnhancers =
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer,
    }),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  // @ts-ignore
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    // @ts-ignore
    module.hot.accept("./Redux/Reducers/index", () => {
      const nextReducer = require("./Redux/Reducers/index").default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  const persistor = persistStore(store);

  return { store, history, persistor };
}

export default ConfiureStore;
