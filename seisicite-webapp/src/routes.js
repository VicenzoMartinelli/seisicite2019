import React, { Fragment } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
//import { ModalContainer } from "react-router-modal";
//import "react-router-modal/css/react-router-modal.css";
import history from './history';
import Home from "./pages/home";
import Login from "./pages/login";
import articles from "./pages/articles";

//import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      //TODO controlar autenticação de alguma forma
      false ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const NoMatch = () => (
  <h2>
    nada aqui irmao
  </h2>
);

const Routes = () => (
  <Router history={history}>
    <Fragment>
      <Switch>
        <Route exact path={["", "/"]} component={Home} />
        <Route path="/articles" component={articles} />
        <Route path="/login" component={Login} />
        <Route path="/secret" component={() => <h1>aaaa</h1>} />
        <Route component={NoMatch} />
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;
