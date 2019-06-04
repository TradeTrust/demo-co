import React from "react";
import ReactDOM from "react-dom";
import Main from "./main";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store";

ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
