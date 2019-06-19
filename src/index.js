import React from "react";
import { render } from "react-snapshot";
import Main from "./main";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./store";
import "bootstrap/dist/css/bootstrap.css";

render(
  <StoreProvider>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </StoreProvider>,
  document.getElementById("root")
);
