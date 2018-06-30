import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import Home from "./components/Home";
import BuildPage1 from "./components/BuildPages/BuildPage1";
import BuildPage2 from "./components/BuildPages/BuildPage2";
import BuildPage3 from "./components/BuildPages/BuildPage3";
import BuildPage4 from "./components/BuildPages/BuildPage4";
import BuildPage5 from "./components/BuildPages/BuildPage5";
import View from "./components/View";
import Error from "./components/Error";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/home" component={Home} />
            <Route path="/build1" component={BuildPage1} />
            <Route path="/build2" component={BuildPage2} />
            <Route path="/build3" component={BuildPage3} />
            <Route path="/build4" component={BuildPage4} />
            <Route path="/build5" component={BuildPage5} />
            <Route path="/view" component={View} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
