import React, {Component} from "react";
import {NavLink, Redirect} from "react-router-dom";
import "./potluck.css";
import axios from "axios";

class Event extends Component {
    state = {
        
    }

    // componentDidMount(){
    //     console.log (this.props.id)
    //     axios.get(`/api/parties/${this.props.id}`)
    //       .then(res => this.setState ({pparty: res.data}))
    //       .then(() => console.log(this.state.pparty));
    // }

    render() {
       // if (this.state.pparty) {
        return (
        <NavLink to={"/" + this.props.userid + "/" + this.props.info.id + "/"}><div class="menu">
            <img className="photo" src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Popcorn_Time_logo.png" />
            <div className="details">
            <p>{this.props.info.partyName} </p>
            <p>{this.props.info.date}</p>
            <p>{this.props.info.time}</p>
            </div>
        </div></NavLink>
        )//}

        //return(<div></div>)
    }   
}



class Events extends Component {
    state = {
        
    }

    parties;

    userqueryid = this.props.match.params.userid;

    componentDidMount(){
        axios.get(`/api/users/${this.userqueryid}`)
          .then(res => this.setState ({user: res.data}))
          .then(() => console.log(this.state.user));
        
        axios.get(`/api/userparty/${this.userqueryid}`)
          .then(res => this.parties = res.data)
          .then(res => this.setState ({events: this.parties}));
         // .then(() => console.log(this.state.parties[0].partyId));
    }

    all = () => {
      this.setState({events: this.parties})
    }

    yours = () => {
       this.setState({events: this.parties.filter(i => i.hostId == this.userqueryid)})
    }

    theirs = () => {
        this.setState({events: this.parties.filter(i => i.hostId != this.userqueryid)})
    }

    render(){
        if (this.state.user && this.state.events) {
            return (
                <div className="container">
                    <NavLink to={"/"+this.userqueryid+"/home"}><img className="logo" src="https://image.ibb.co/kn5pgo/potlucky_logo.png" alt="potlucky_logo"/></NavLink>
                    <div className="title">
                        <h2>Upcoming Potlucks</h2>
                        <button class="submit" onClick={this.all}>All</button>
                        <button class="submit" onClick={this.yours}>Yours</button>
                        <button class="submit" onClick={this.theirs}>Theirs</button>
                    </div>
        
                {this.state.events.map((i) =>(
                    <Event
                        info={i}
                        userid={this.state.user.id}
                    />
                ))}
                </div>
              )
        }

        return(<div></div>)
    }
  }

export default Events;