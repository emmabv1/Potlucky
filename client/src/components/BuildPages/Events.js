import React, {Component} from "react";
import {NavLink, Redirect} from "react-router-dom";
import "./potluck.css";

const parties = [
    {
        name: "Movie Night",
        date: "Tomorrow",
        host: true,
    },
    {
        name: "Bonfire",
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
        <button class="collapsible">
            <p>{this.props.name} </p>
            <p>{this.props.date}</p>
        </button>
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
        <div>
        <h2>Upcoming Potlucks</h2>

        <button onClick={this.all}>All</button>
        <button onClick={this.yours}>Yours</button>
        <button onClick={this.theirs}>Theirs</button>

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