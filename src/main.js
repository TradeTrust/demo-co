import { Switch, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";

const Home = lazy(() => import("./components/home/dropZone"));
const IframeRenderer = lazy(() =>
  import("./components/renderer/iframeRenderer")
);

function Main() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/renderer" component={IframeRenderer} />
      </Switch>
    </Suspense>
  );
}

export default Main;
