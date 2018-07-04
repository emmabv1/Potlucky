import React, {Component} from "react";
import {Redirect} from "react-router-dom";

class Potluck extends Component {
    state = {
      toevents: false
    };
  
    handleFormSubmit = event => {
      event.preventDefault();
      this.setState({toevents: true});
    };
  
    render() {
        if (this.state.toevents === true) {
          return <Redirect to='/events'/>
        }
      return (
          <div>
              <p>Event Image</p>
              <h1>Event Name</h1>
              <h2>Location</h2>
              <h2>Date and Time</h2>
              <h2>Number of guests</h2>

              <h2>What are you bringing to the party?</h2>

                <button>Salad</button> <span>x</span>
                <button>Entrees</button> <span>x</span>
                <button>Drinks</button> <span>x</span>
                <button>Dessert</button> <span>x</span>
                    <ul>
                        <li>Cupcakes --- Name of person</li>
                        <li>Cake --- Name of person</li>
                        <li>Cookies --- Name of person</li>
                    </ul>
                    <form>
                      <input
                      type="text"
                      placeholder="New Item"
                      name="newitem"
                      />
                        <button>Add</button>

                      <button onClick={this.handleFormSubmit}>Submit</button>
                  </form>
                <button>Disposables</button> <span>x</span>
                <button>Miscellaneous</button> <span>x</span>

                  <form>
                      <button onClick={this.handleFormSubmit}>Done</button>
                  </form>
          </div>
      );
    }
  }
  
  export default Potluck;