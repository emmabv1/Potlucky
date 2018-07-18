import React, {Component} from "react";
import {NavLink, Redirect} from "react-router-dom";

class NewUser extends Component {
    state = {
      tologin: false,
      name: "",
      email: "",
      password: "",
      confirm: ""
    };

    handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };
  
    handleFormSubmit = event => {

      
      event.preventDefault();

      var data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }
      console.log(data)
      fetch("/api/users", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
      }).then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
      }).then(function(data) {
          console.log(data)    
          if(data == "success"){
            this.setState({msg: "Thanks for registering"});  
          }
      }).catch(function(err) {
          console.log(err)
      });


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
                      <p>Full Name</p>
                      <input
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleInputChange}
                      />

                      <p>Email</p>
                      <input
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                      />

                      <p>Create Password</p>
                      <input
                      type="text"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                      />

                      <p>Confirm Password</p>
                      <input
                      type="text"
                      name="confirm"
                      value={this.state.confirm}
                      onChange={this.handleInputChange}
                      />
                    </div>

                      <div>
                      <button class="submit" onClick={this.handleFormSubmit} formMethod="POST">Submit</button>
                      </div>
                  </form>
          </div>
      );
    }
  }
  
  export default NewUser;