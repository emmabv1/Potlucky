import React, {Component} from "react";
import { NavLink, Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: "",
    tohome: false
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({ username: "", password: "", tohome: true});
  };

  render() {
      if (this.state.tohome === true) {
        return <Redirect to='/home' />
      }
    return (
        <div>
            <h1> Potlucky! </h1>
            <img id="logo" src= "https://vignette.wikia.nocookie.net/clubpenguin/images/a/a9/Pot_O%27_Gold_clothing_icon_ID_324.png/revision/latest?cb=20130104002816"/>
                <form>
                    <p>Username: {this.state.username}</p>
                    <p>Password: {this.state.password}</p>
                    <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    />
                    <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    />
                    <button onClick={this.handleFormSubmit}>Submit</button>

                    <button>Facebook Login</button>

                    <button>Meetup Login</button>

                    <NavLink to="">Create Account</NavLink>
                </form>
        </div>
    );
  }
}

export default Login;