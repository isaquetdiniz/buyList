import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "./views/login";
import Edit from "./views/edit";

import "antd/dist/antd.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/edit" component={Edit} />
      </Switch>
    </Router>
  );
}

export default App;
