import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "./views/login";
import Edit from "./views/edit";
import { useAuth } from "./context/AuthContextProvider";

import "antd/dist/antd.css";
import "./index.css";

function App() {
  const token = useAuth()[0];

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {token ? <Redirect to="/edit" /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login" component={token ? Edit : Login} />
        <Route path="/edit" component={token ? Edit : Login} />
        <Route component={token ? Edit : Login} />
      </Switch>
    </Router>
  );
}

export default App;
