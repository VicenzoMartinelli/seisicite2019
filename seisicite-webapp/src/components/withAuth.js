import React, { useState, useEffect } from "react";
import * as auth from "../services/auth";
import history from "../history";

export default function withAuth(AuthComponent) {
  return () => {
    const [confirm, setConfirm] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      if (!auth.loggedIn()) {
        auth.logout();

        history.replace("/login");
      } else {
        try {
          setConfirm(auth.getConfirm());
          setLoaded(true);
        } catch (err) {
          auth.logout();

          history.replace("/login");
        }
      }
    }, []);

    if (loaded && confirm) {
      return <AuthComponent history={history} confirm={confirm} />;
    }

    return null;
  };
}
