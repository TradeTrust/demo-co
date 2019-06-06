import { Switch, Route } from "react-router-dom";
import React from "react";
import Home from "./components/index";
import IframeRenderer from "./components/renderer/iframeRenderer";
function Main() {
  return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/renderer" component={IframeRenderer} />
      </Switch>
  );
}

export default Main;
