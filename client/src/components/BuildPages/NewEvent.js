import React, {Component} from "react";
import {NavLink, Redirect} from "react-router-dom";

class NewEvent extends Component {
    state = {
      todetails: false
    };
  
    handleFormSubmit = event => {
      event.preventDefault();
      this.setState({todetails: true});
    };
  
    render() {
        if (this.state.todetails === true) {
          return <Redirect to='/details/:id'/>
        }
      return (
          <div className="container">
          <NavLink to="/home"><img className="logo" src="https://image.ibb.co/kn5pgo/potlucky_logo.png" alt="potlucky_logo"/></NavLink>
            <div class="title">
              <h2>Create a new Potluck</h2>
            </div>
                  <form> {/*limit is 23 characters*/}
                    <div className="submit frame">
                      <p>Party Name</p>
                      <input
                      type="text"
                      name="name"
                      />

                      <p>Address</p>
                      <input
                      type="text"
                      name="address"
                      />

                      <p>Date</p>
                      <input
                      type="date"
                      name="date"
                      />

                      <p>Time</p>
                      <input
                      type="time"
                      name="time"
                      />

                      <p>Party Size (optional)</p>
                      <input
                      type="number"
                      name="guest limit"
                      />

                      <p>Image (optional)</p>
                      <input                      
                      type="file"
                      name="image"
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
  
  export default NewEvent;