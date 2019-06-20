import React, { useReducer } from "react";
import PropTypes from "prop-types";
import reducers from "./reducers";
import { enableLogger, disableLogger } from "./utils/logger";
import {
  appInitialState,
  docInitialState
} from "components/home/reducer/constants";

if (process.env.NODE_ENV === "development") {
  enableLogger();
} else {
  disableLogger();
}

export const Store = React.createContext(); //eslint-disable-line
const initialState = { home: appInitialState, document: docInitialState };

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducers, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

StoreProvider.propTypes = {
  children: PropTypes.func
};
