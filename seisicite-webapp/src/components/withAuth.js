import React, { useState, useEffect, Component } from "react";
import * as auth from "../services/auth";
import history from "../history";

export default function withAuth(AuthComponent) {
  return class WithAuth extends Component {

    state = { confirm: null, loaded: false };

    componentDidMount() {
      if (!auth.loggedIn()) {
        auth.logout();

        history.replace("/login");
      } else {
        try {
          this.setState({
            confirm: auth.getConfirm(),
            loaded: true
          });
        } catch (err) {
          auth.logout();

          history.replace("/login");
        }
      }
    }

    render() {
      if (this.state.loaded && this.state.confirm) {
        return <AuthComponent history={history} confirm={this.state.confirm} {...this.props} />;
      }

      return null;
    }
  }
};