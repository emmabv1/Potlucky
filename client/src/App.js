import React, { Component } from 'react';
import {HashRouter, Route, Switch, NavLink} from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import Home from "./components/Home";
import Events from "./components/BuildPages/Events";
import NewEvent from "./components/BuildPages/NewEvent";
import EventDetails from "./components/BuildPages/EventDetails";
import InviteGuests from "./components/BuildPages/InviteGuests";
import Potluck from "./components/BuildPages/Potluck";
import Join from "./components/BuildPages/JoinEvent";
import View from "./components/View";
import Error from "./components/Error";

class App extends Component {
  render() {
    return (
      <div>
      
      <HashRouter basename="/">
      
        <div className="App">
        
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/home" component={Home} />
            <Route path="/events" component={Events} />
            <Route path="/newevent" component={NewEvent} />
            <Route path="/details/:id" component={EventDetails} />
            <Route path="/invites/:id" component={InviteGuests} />
            <Route path="/potluck/:id" component={Potluck} />
            <Route path="/join" component={Join} />
            <Route path="/view" component={View} />
            <Route component={Error} />
          </Switch>
        </div>
      </HashRouter>
      </div>
    );
  }
}

export default App;
