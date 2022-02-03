import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Event from "./views/Event";
import Home from "./views/Home";
import Error404 from "./views/Error404";
import Auditorium from "./views/auditorium";

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/event/:site" component={Event} />
        <Route exact path="/auditorio" component={Auditorium} />
        <Route exact path="/room/:room" component={Auditorium} />
        <Route path="*" component={Error404} />
      </Switch>
    </Router>
  );
}

export default App;
