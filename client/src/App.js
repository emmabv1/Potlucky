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
import Error from "./components/Error";
import NewUser from "./components/newUser";

class App extends Component {
  render() {
    return (
      <div>
      
      <HashRouter basename= "/">
      
        <div className="App">
        
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/newuser" component={NewUser} />
            <Route path="/join/:eventid/:userid" component={Join} />
            <Route path="/:userid/home" component={Home} />
            <Route path="/:userid/events" component={Events} /> 
            <Route path="/:userid/newevent" component={NewEvent} />
            <Route path="/:userid/:eventid" component={Potluck} />
            <Route path="/:userid/:eventid/details/" component={EventDetails} />
            <Route path="/:userid/:eventid/invites/" component={InviteGuests} />
            
            <Route component={Error} />
          </Switch>
        </div>
      </HashRouter>
      </div>
    );
  }
}

export default App;
