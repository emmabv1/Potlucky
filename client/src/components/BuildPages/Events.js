import React, {Component} from "react";
import {NavLink, Redirect} from "react-router-dom";
import "./potluck.css";
import axios from "axios";

class Event extends Component {
    state = {
        
    }

    componentDidMount(){
        axios.get(`/api/parties/${this.props.id}`)
          .then(res => this.setState ({pparty: res.data}))
          .then(() => console.log(this.state.pparty));
    }

    render() {
        if (this.state.pparty) {
        return (
        <NavLink to={"/" + this.props.userid + "/" + this.state.pparty.id + "/"}><div class="menu">
            <img className="photo" src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Popcorn_Time_logo.png" />
            <div className="details">
            <p>{this.state.pparty.partyName} </p>
            <p>{this.state.pparty.date}</p>
            <p>{this.state.pparty.time}</p>
            </div>
        </div></NavLink>
        )}

        return(<div></div>)
    }   
}



class Events extends Component {
    state = {
        
    }

    userqueryid = this.props.match.params.userid;

    componentDidMount(){
        axios.get(`/api/users/${this.userqueryid}`)
          .then(res => this.setState ({user: res.data}))
          .then(() => console.log(this.state.user));
    }

    all = () => {
      //  this.setState({events: parties})
    }

    yours = () => {
     //   this.setState({events: parties.filter(i => i.host === true)})
    }

    theirs = () => {
     //   this.setState({events: parties.filter(i => i.host === false)})
    }

    render(){
        if (this.state.user) {
            return (
                <div className="container">
                    <NavLink to={"/"+this.userqueryid+"/home"}><img className="logo" src="https://image.ibb.co/kn5pgo/potlucky_logo.png" alt="potlucky_logo"/></NavLink>
                    <div className="title">
                        <h2>Upcoming Potlucks</h2>
                        <button class="submit" onClick={this.all}>All</button>
                        <button class="submit" onClick={this.yours}>Yours</button>
                        <button class="submit" onClick={this.theirs}>Theirs</button>
                    </div>
        
                {JSON.parse(this.state.user.parties).map((i) =>(
                    <Event
                        id={i}
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