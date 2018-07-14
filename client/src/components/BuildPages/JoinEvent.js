import React, {Component} from "react";
import {NavLink, Redirect} from "react-router-dom";

class Join extends Component {
  state = {
    topotluck: false
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({topotluck: true});
  };

  render() {
      if (this.state.topotluck === true) {
        return <Redirect to='/potluck/:id' />
      }
    return (
        <div className="container">
            <h1> Potlucky! </h1>
            <img id="logo" src= "https://vignette.wikia.nocookie.net/clubpenguin/images/a/a9/Pot_O%27_Gold_clothing_icon_ID_324.png/revision/latest?cb=20130104002816"/>
            
            <h3> Your friend has invited you to Join this Potluck</h3>
            <button onClick={this.handleFormSubmit}>Join</button>
        </div>
    );
  }
}

export default Join;