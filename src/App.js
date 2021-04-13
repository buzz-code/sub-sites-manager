import React, { useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddRoute from "./components/AddRoute";
import RoutesList from "./components/RoutesList";

const App = () => {
  if (!window.location.search.includes('auth=true')) {
    window.location.href = '/listen-report';
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/routes" className="navbar-brand">
          SubRoutesManager
          </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/routes"} className="nav-link">
              Routes
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <h2>Sub Routes Manager</h2>
        <Switch>
          <Route exact path={["/", "/routes"]} component={RoutesList} />
          <Route exact path="/add" component={AddRoute} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
