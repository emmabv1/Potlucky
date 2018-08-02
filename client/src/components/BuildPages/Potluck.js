import React, {Component} from "react";
import {NavLink, Redirect} from "react-router-dom";
import "./potluck.css";
import axios from "axios";

class EventInfo extends Component {
  render(){
    return (
    <div className="title">
      <img className="photo" src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Popcorn_Time_logo.png"/>
      <h1>{this.props.info.partyName}</h1>
      <div className="info">
        <p>{this.props.info.address}</p>
        <p>{this.props.info.date} at {this.props.info.time}</p>
        <p>Hosted by: {this.props.info.host}</p>
      </div>
    </div>
    )
  }
}

class Category extends Component {

  state = {
    open: false,
    display: {display: "none"},
    itemName: ""
  }

  componentDidMount(){
    axios.get(`/api/items/${this.props.partyId}/${this.props.category}`)
      .then(res => this.setState ({items: res.data}))
      .then(() => console.log(this.state.items));
  }

  expand = () => {
    if(this.state.open) {
      this.setState({open: false, display: {display: "none"}})
    }else {
      this.setState({open: true, display: {display: "block"}})
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleAdd = event => {
    event.preventDefault();

    axios.post(`/api/items`, {
      itemName: this.state.itemName,
      //itemQuantity: this.state.itemQuantity,
      partyId: this.props.partyId,
      category: this.props.category,
      guest: this.props.guest,})
    .then(res => {
      console.log(res);
      console.log(res.data);
    });
  };
  
  
  render () {
    if (this.state.items){
      return(
        <div>
          <div className="collapsible menu" onClick={this.expand}>{this.props.category}</div>
          <div className="content" style={this.state.display}>

            {this.state.items.map((i) => (
              <Item
                item={i}
              />
            ))}
              
            <form>
              <input
              type="text"
              placeholder="New Item"
              name="itemName"
              value={this.state.itemName}
              onChange={this.handleInputChange}
              />
              <button class="submit" onClick={this.handleAdd} formMethod="POST">Add</button>
            </form>
          </div>
        </div>
      )
    }
    return(<div></div>)
  }
}

class Item extends Component {
  render() {
    return (
      <div className="list">
        <ul><li>{this.props.item.itemName} ({this.props.item.guest})</li></ul>
      </div>
    )
  }
}

class Potluck extends Component {
    state = {
      toevents: false
    };

    userqueryid = this.props.match.params.userid;
    partyqueryid = this.props.match.params.eventid;

    componentDidMount(){
      axios.get(`/api/users/${this.userqueryid}`)
        .then(res => this.setState ({user: res.data}))
        .then(() => console.log(this.state.user));

      axios.get(`/api/parties/${this.partyqueryid}`)
        .then(res => this.setState ({pparty: res.data}))
       // .then(() => console.log(JSON.parse(this.state.pparty.itemCategories)));
    }
  
    handleFormSubmit = event => {
      event.preventDefault();
      this.setState({toevents: true});
    };
  
    render() {
      if (this.state.toevents === true) {
        return <Redirect to={"/"+this.userqueryid+"/events"}/>
      }

      if (this.state.user && this.state.pparty) {
        return (
          <div className="container">
          <NavLink to={"/"+this.userqueryid+"/home"}><img className="logo" src="https://image.ibb.co/kn5pgo/potlucky_logo.png" alt="potlucky_logo"/></NavLink>
              <EventInfo
                info={this.state.pparty}
              />

              <h2>What are you bringing to the party?</h2>

              {/*JSON.parse(this.state.pparty.itemCategories).map((i) => (
                <Category
                  category={i}
                  partyId={this.state.pparty.id}
                  guest={this.state.user.id}
                />
              ))*/}

              <form>
                  <button className="submit" onClick={this.handleFormSubmit}>Done</button>
              </form>
          </div>
        );
      }
      return(<div></div>)
    }
  }
  
  export default Potluck;