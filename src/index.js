import React from "react";
import { render } from "react-snapshot";
import Main from "./main";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import "bootstrap/dist/css/bootstrap.css";

render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
