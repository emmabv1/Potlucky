import React, {Component} from "react";
import {NavLink, Redirect} from "react-router-dom";


const partyinfo = {
  image: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Popcorn_Time_logo.png",
  name: "Movie Night",
  location: "My house",
  date: "Tomorrow",
  time: "9:00pm",
  host: "Your Friend"
}

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
            <img id="logo" src="https://image.ibb.co/kn5pgo/potlucky_logo.png" alt="potlucky_logo"/>
           
            <h3> {partyinfo.host} has invited you to join:</h3>

            <div className="menu">
              <img className="photo" src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Popcorn_Time_logo.png" />
              <div className="details">
              <p>{partyinfo.name} </p>
              <p>{partyinfo.date}</p>
              <p>{partyinfo.time}</p>
              </div>
            </div>

            <button className="submit" onClick={this.handleFormSubmit}>Join</button>
        </div>
    );
  }
}

export default Join;

/*

import React, {Component} from "react";
import {NavLink, Redirect} from "react-router-dom";
import "./login.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    tohome: false
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({tohome: true});
  };

  handleFacebookBtn = event =>{
    event.preventDefault();
    document.location.replace("/login/facebook")
  };

  handleGoogleBtn = event =>{
    event.preventDefault();
    document.location.replace("/auth/google")
  }; 
 
  render() {
      if (this.state.tohome === true) {
        return <Redirect to='/home' />
      }
    return (
      <div className="container">
        <img id="logo" src="https://image.ibb.co/kn5pgo/potlucky_logo.png" alt="potlucky_logo"/>
        <form class="forms">
          <p>Username: {this.state.username}</p>
          <input
          type="text"
          placeholder=""
          name="username"
          value={this.state.username}
          onChange={this.handleInputChange}
          />
          <p>Password: {this.state.password}</p>
          <input
          type="password"
          placeholder=""
          name="password"
          value={this.state.password}
          onChange={this.handleInputChange}
          />
          <div class="submitbox">
            <button class="submit" onClick={this.handleFormSubmit}>Submit</button>
          </div>
          <p><NavLink to="/newuser">Create Account</NavLink></p>
        </form>
        

        <div>
          <button class="login" id="facebook" onClick={this.handleFacebookBtn}>Facebook Login</button>
        </div>
        <div>
          <button class="login" id="google" onClick={this.handleGoogleBtn}>Google Login</button>
        </div>
        <div>
          <button class="login" id="meetup">Meetup Login</button>
        </div>
      </div>
    );
  }
}

export default Login;

*/