import React, {Component} from "react";
import {NavLink, Redirect} from "react-router-dom";
import "./potluck.css";
import axios from "axios";

const img = "https://upload.wikimedia.org/wikipedia/commons/6/6c/Popcorn_Time_logo.png";

class EventInfo extends Component {
  render(){
    return (
    <div className="title">
      <img className="photo" src={this.props.info.image != ""? this.props.info.image:img}/>


      {/* src={this.props.img1 === flippy || this.props.img2 === flippy  || this.props.correct.includes(this.props.id)? front:back} */}
      <h1>{this.props.info.partyName}</h1>
      <div className="info">
        <p>{this.props.info.address}</p>
        <p>{this.props.info.date} at {this.props.info.time}</p>
        <p>Hosted by: {this.props.info.hostName}</p>
      </div>
    </div>
    )
  }
}

class Category extends Component {
  state = {
    open: false,
    display: {display: "none"},
    itemName: "",
   // items: this.props.items,
  }

  getItems = () => {
    axios.get(`/api/items/${this.props.partyId}/${this.props.category.catName}`)
      .then(res => this.setState ({items: res.data}))
      .then(() => console.log(this.state.items));

  }

  componentDidMount(){
    this.getItems();
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
      category: this.props.category.catName,
      guestId: this.props.guest.id,
      guestName: this.props.guest.name,
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
      this.getItems();
    });
  };
  
  
  render () {
    if (this.state.items){
      return(
        <div>
          <div className="collapsible menu" onClick={this.expand}>{this.props.category.catName}</div>
          <div className="content" style={this.state.display}>

            {this.state.items.map((i) => (
              <Item
                item={i}
                user={this.props.guest}
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
  state = {
    display: {display: "none"},
    itemdisplay: {display: "block"}
  }

  componentDidMount(){
    if (this.props.item.guestId == this.props.user.id) {
      this.setState ({display: {display: "inline-block"}});
    }
    // else {
    //   this.setState ({display: {display: "none"}});
    // }
  }

  deleteItem = event => {
    event.preventDefault();

    axios.delete(`api/items/${this.props.item.id}`)
      .then(() => this.setState ({itemdisplay: {display: "none"}}));
  }

  render() {
   // if (this.state.display){
      return (
        <div className="list" style={this.state.itemdisplay}>
          <ul style={{display: "inline-block"}}><li>{this.props.item.itemName} ({this.props.item.guestName})</li></ul>
          <button style={this.state.display} onClick={this.deleteItem}>x</button>
        </div>
      )
   // }
    

 //   return (<div></div>)
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

      axios.get(`/api/categories/${this.partyqueryid}`)
        .then(res => this.setState ({pcats: res.data}))

      // axios.get(`/api/items/${this.partyqueryid}`)
      //   .then(res => this.setState ({pitems: res.data}))
    }
  
    handleFormSubmit = event => {
      event.preventDefault();
      this.setState({toevents: true});
    };
  
    render() {
      if (this.state.toevents === true) {
        return <Redirect to={"/"+this.userqueryid+"/events"}/>
      }

      if (this.state.user && this.state.pparty && this.state.pcats) {
        return (
          <div className="container">
          <NavLink to={"/"+this.userqueryid+"/home"}><img className="logo" src="https://image.ibb.co/kn5pgo/potlucky_logo.png" alt="potlucky_logo"/></NavLink>
              <EventInfo
                info={this.state.pparty}
              />

              <h2>What are you bringing to the party?</h2>

              {this.state.pcats.map((i) => (
                <Category
                  category={i}
                  partyId={this.state.pparty.id}
                  guest={this.state.user}
                 // items={this.state.pitems}
                />
              ))}

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