import React, {Component} from "react";
import {Redirect} from "react-router-dom";

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
          <div>
              <h1>Create a new Potluck</h1>
                  <form>
                      <p>Party Name</p>
                      <input
                      type="text"
                      placeholder="Party Name"
                      name="name"
                      />

                      <p>Location</p>
                      <input
                      type="text"
                      placeholder="Address"
                      name="location"
                      />

                      <p>Date</p>
                      <input
                      type="text"
                      placeholder="Date"
                      name="location"
                      />

                      <p>Time</p>
                      <input
                      type="text"
                      placeholder="Time"
                      name="location"
                      />

                      <p>Party Size (optional)</p>
                      <input
                      type="text"
                      placeholder="Address"
                      name="location"
                      />

                      <p>Image(optional)</p>
                      <input
                      type="text"
                      placeholder="Address"
                      name="location"
                      />

                      <button onClick={this.handleFormSubmit}>Submit</button>
                  </form>
          </div>
      );
    }
  }
  
  export default NewEvent;