import React, {Component} from "react";
import {NavLink, Redirect} from "react-router-dom";

class NewUser extends Component {
    state = {
      tologin: false
    };
  
    handleFormSubmit = event => {
      event.preventDefault();
      this.setState({tologin: true});
    };
  
    render() {
        if (this.state.tologin === true) {
          return <Redirect to='/'/>
        }
      return (
          <div className="container">
          <img className="logo" src="https://image.ibb.co/kn5pgo/potlucky_logo.png" alt="potlucky_logo"/>
            <div class="title">
              <h2>Create an Account</h2>
            </div>
                  <form> {/*limit is 23 characters*/}
                    <div className="submit frame">
                      <p>First Name</p>
                      <input
                      type="text"
                      name="name"
                      />

                      <p>Last Name</p>
                      <input
                      type="text"
                      name="address"
                      />

                      <p>Email</p>
                      <input
                      type="email"
                      name="email"
                      />

                      <p>Password</p>
                      <input
                      type="text"
                      name="password"
                      />

                      <p>Confirm Password</p>
                      <input
                      type="text"
                      name="confirm-password"
                      />

                    </div>

                      <div>
                      <button class="submit" onClick={this.handleFormSubmit}>Submit</button>
                      </div>
                  </form>
          </div>
      );
    }
  }
  
  export default NewUser;