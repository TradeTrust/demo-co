import { Switch, Route } from "react-router-dom";
import React from "react";
import Loadable from "react-loadable";

const Home = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "home" */ "./components/home/container/index.js"
    ),
  loading: () => null,
  modules: ["home"]
});

const IframeRenderer = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "iframneRenderer" */ "./components/renderer/iframeRenderer/index.js"
    ),
  loading: () => null,
  modules: ["iframeRenderer"]
});

function Main() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/renderer" component={IframeRenderer} />
    </Switch>
  );
}

export default Main;
