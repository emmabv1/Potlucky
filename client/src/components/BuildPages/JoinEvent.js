import React, {Component} from "react";
import {NavLink, Redirect} from "react-router-dom";
import axios from "axios";

class Join extends Component {
  state = {
    topotluck: false
  };

  userqueryid = this.props.match.params.userid;
  partyqueryid = this.props.match.params.eventid;

  componentDidMount(){
    axios.get(`/api/users/${this.userqueryid}`)
      .then(res => this.setState ({user: res.data}))
      .then(() => console.log(this.state.user));

    axios.get(`/api/parties/${this.partyqueryid}`)
      .then(res => this.setState ({pparty: res.data}))
      .then(() => console.log(this.state.pparty));
  }

  handleFormSubmit = event => {
    event.preventDefault();
    axios.post(`/api/userparty`, {userId: this.state.user.id, partyId: this.state.pparty.id,})
        .then(() => this.setState({topotluck: true}));
  };

  render() {
    if (this.state.topotluck === true) {
      return <Redirect to={"/"+this.userqueryid+"/"+this.partyqueryid}/>
    }

    if (this.state.user && this.state.pparty) {
      return (
          <div className="container">
              <img id="logo" src="https://image.ibb.co/kn5pgo/potlucky_logo.png" alt="potlucky_logo"/>
            
              <h3> {this.state.pparty.hostName} has invited you to join:</h3>

              <div className="menu">
                <img className="photo" src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Popcorn_Time_logo.png" />
                <div className="details">
                <p>{this.state.pparty.partyName} </p>
                <p>{this.state.pparty.date}</p>
                <p>{this.state.pparty.time}</p>
                </div>
              </div>

              <button className="submit" onClick={this.handleFormSubmit}>Join</button>
          </div>
      )
    }
    
  return (<div></div>);
  }
}

export default Join;