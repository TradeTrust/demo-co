import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";
import reducers from "./reducers";
import { enableLogger, disableLogger} from "./utils/logger";

if(process.env.NODE_ENV === "development") {
  enableLogger();
} else {
  disableLogger();
}

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(sagas);
  return store;
};

export default configureStore;
