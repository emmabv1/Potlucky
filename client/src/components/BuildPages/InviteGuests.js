import React, {Component} from "react";
import {NavLink, Redirect} from "react-router-dom";

class InviteGuests extends Component {
    state = {
      toevents: false
    };

    userqueryid = this.props.match.params.userid;
    partyqueryid = this.props.match.params.eventid;

    link = `https://secure-wave-40762.herokuapp.com/#/join/${this.partyqueryid}`;


    copyLink = event => {
      event.preventDefault();
      let text = document.getElementById("sharelink");
      text.select();
      document.execCommand("copy");
    }
  
    handleFormSubmit = event => {
      event.preventDefault();
      this.setState({toevents: true});
    };
  
    render() {
        if (this.state.toevents === true) {
          return <Redirect to={"/"+this.userqueryid+"/events"}/>
        }
      return (
          <div className="container">
            <NavLink to={"/"+this.userqueryid+"/home"}><img className="logo" src="https://image.ibb.co/kn5pgo/potlucky_logo.png" alt="potlucky_logo"/></NavLink>
            <div className="title">
              <h2>Potluck Created!</h2>
            </div>
          
            <h3>Invite Your Friends</h3>

            <form>
              <div className="info">
                  <p>Get Shareable Link</p>
                  <input
                  id="sharelink"
                  type="text"
                  value={this.link}
                  name="link"
                  />
                  <button onClick={this.copyLink}>Copy</button>

              </div>
              <button className="submit"onClick={this.handleFormSubmit}>Done</button>
                
            </form>
            
          </div>
      );
    }
  }
  
  export default InviteGuests;