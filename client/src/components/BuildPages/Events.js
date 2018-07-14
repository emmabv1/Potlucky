import React, {Component} from "react";
import {NavLink, Redirect} from "react-router-dom";
import "./potluck.css";

const time = "00:00"

const parties = [
    {
        name: "Movie Night",
        date: "Wed, September 16th",
        host: true,
    },
    {
        name: "Bonfirejfkdlsafjeiwofew",
        date: "Next Week",
        host: false,
    },
    {
        name: "Birthday",
        date: "In two days",
        host: false,
    },
    {
        name: "Movie Night",
        date: "In three weeks",
        host: false,
    },
    {
        name: "Board Game Day",
        date: "Wednesday",
        host: true,
    },
    {
        name: "Orientation",
        date: "tbd",
        host: true,
    },
]



class Event extends Component {
    render() {
        return (
        <NavLink to="/potluck/:id"><div class="menu">
            <img className="photo" src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Popcorn_Time_logo.png" />
            <div className="details">
            <p>{this.props.name} </p>
            <p>{this.props.date}</p>
            <p>{time}</p>
            </div>
        </div></NavLink>
        );
    }   
}



class Events extends Component {
    state = {
        events: parties
    }

    all = () => {
        this.setState({events: parties})
    }

    yours = () => {
        this.setState({events: parties.filter(i => i.host === true)})
    }

    theirs = () => {
        this.setState({events: parties.filter(i => i.host === false)})
    }

    render(){
      return (
        <div className="container">
            <NavLink to="/home"><img className="logo" src="https://image.ibb.co/kn5pgo/potlucky_logo.png" alt="potlucky_logo"/></NavLink>
            <div className="title">
                <h2>Upcoming Potlucks</h2>
                <button class="submit" onClick={this.all}>All</button>
                <button class="submit" onClick={this.yours}>Yours</button>
                <button class="submit" onClick={this.theirs}>Theirs</button>
            </div>

        {this.state.events.map((i) =>(
            <Event
                name={i.name}
                date={i.date}
            />
        ))}
        

    </div>
      )
    }
  }




export default Events;