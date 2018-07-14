import React, {Component} from "react";
import {Redirect} from "react-router-dom";

class InviteGuests extends Component {
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
          <div className="container">

              <h2>Potluck Successfully Created!</h2>
              <h2>Invite Your Friends</h2>

                  <form>
                        <p>Get Shareable Link</p>
                        <input
                        type="text"
                        placeholder="http://shareablelink"
                        name="link"
                        />
                        <button>Copy</button>

                        <h3>Your Contacts</h3>
                        <ul>
                            <li>Friend</li>
                            <li>Friend</li>
                            <li>Friend</li>
                            <li>Friend</li>
                            <li>Friend</li>
                        </ul>

                      <button onClick={this.handleFormSubmit}>Send Invitations</button>
                  </form>
          </div>
      );
    }
  }
  
  export default InviteGuests;