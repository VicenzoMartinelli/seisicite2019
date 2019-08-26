import React, { Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from './history';
import Loading from "./components/Loading";

const NoMatch = () => (
  <h2>
    nada aqui irmao
  </h2>
);

const Login = lazy(() => import("./pages/login/login"));
const Home = lazy(() => import("./pages/home/index"));
const ArticlesSei = lazy(() => import("./pages/articles/index-sei"));

const Routes = () => (
  <Router history={history}>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path={["", "/", "/home"]} component={Home} />
        <Route exact path="/articles/sei" component={ArticlesSei} />
        <Route path="/login" component={Login} />
        <Route component={NoMatch} />
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
