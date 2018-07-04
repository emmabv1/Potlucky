import React, {Component} from "react";
import {Redirect} from "react-router-dom";

class EventDetails extends Component {
    state = {
      toinvites: false
    };
  
    handleFormSubmit = event => {
      event.preventDefault();
      this.setState({toinvites: true});
    };
  
    render() {
        if (this.state.toinvites === true) {
          return <Redirect to='/invites/:id'/>
        }
      return (
          <div>
              <h2>What kind of stuff would you like your guests to bring?</h2>

                <button>Salad</button> <span>x</span>
                <button>Entrees</button> <span>x</span>
                <button>Drinks</button> <span>x</span>
                <button>Dessert</button> <span>x</span>
                <button>Disposables</button> <span>x</span>
                <button>Miscellaneous</button> <span>x</span>

                  <form>
                      <p>Add Category</p>
                      <input
                      type="text"
                      placeholder="New Category"
                      name="newcat"
                      />
                        <button>Add</button>

                      <button onClick={this.handleFormSubmit}>Submit</button>
                  </form>
          </div>
      );
    }
  }
  
  export default EventDetails;