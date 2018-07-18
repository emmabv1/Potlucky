import React, {Component} from "react";
import {NavLink, Redirect} from "react-router-dom";
import "./potluck.css";

const partyinfo = {
  image: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Popcorn_Time_logo.png",
  name: "Movie Night",
  location: "My house",
  date: "Tomorrow",
  time: "9:00pm",
  guests: ["k", "l", "m", "n", "o", "p"],
  categories: ["Entrees", "Desserts", "Disposables", "Beverages", "Salads", "Appetizers"]
}

const food = [
  {
    item:"Cheese Pizza",
    category: "Entrees",
    guest: "k"
  },
  {
    item:"Cookies",
    category: "Desserts",
    guest: "l"
  },
  {
    item:"Ginger Beer",
    category: "Beverages",
    guest: "l"
  },
  {
    item:"Chicken Wings",
    category: "Entrees",
    guest: "m"
  },
  {
    item:"Solo Cups",
    category: "Disposables",
    guest: "p"
  },
  {
    item:"Celery Sticks",
    category: "Appetizers",
    guest: "n"
  },
  {
    item:"Ice Cream",
    category: "Desserts",
    guest: "o"
  }
]


class EventInfo extends Component {
  render(){
    return (
    <div className="title">
      <img className="photo" src={partyinfo.image}/>
      <h1>{partyinfo.name}</h1>
      <div className="info">
        <p>{partyinfo.location}</p>
        <p>{partyinfo.date} at {partyinfo.time}</p>
        <p>Guest count: {partyinfo.guests.length}</p>
      </div>
    </div>
    )
  }
}

class Category extends Component {

  state = {
    items: food,
    open: false,
    display: {display: "none"},
    cat: this.props.category,
    itemName: "",
    itemQuantity: "",
    partyId: "",
    category: "",
    guest: "",
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

      var data = {
        itemName: this.state.itemName,
        itemQuantity: this.state.itemQuantity,
        partyId: this.state.partyId,
        category: this.state.category,
        guest: this.state.guest,
      }
      console.log(data)
      fetch("/api/items", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
      }).then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
      }).then(function(data) {
          console.log(data)    
          if(data == "success"){
            this.setState({msg: "Thanks for registering"});  
          }
      }).catch(function(err) {
          console.log(err)
      });
    };
  
  
  render () {
    return(
      <div>
        <div className="collapsible menu" onClick={this.expand}>{this.state.cat}</div>
        <div className="content" style={this.state.display}>


          {this.state.items.filter(j => j.category === this.state.cat).map((i) => (
            <Item
              item={i.item}
              guest={i.guest}
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
}



class Item extends Component {
  render() {
    return (
      <div className="list">
        <ul><li>{this.props.item} ({this.props.guest})</li></ul>
      </div>
    )
  }
}



class Potluck extends Component {
    state = {
      partyinfo: partyinfo,
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
          <NavLink to="/home"><img className="logo" src="https://image.ibb.co/kn5pgo/potlucky_logo.png" alt="potlucky_logo"/></NavLink>
              <EventInfo/>

              <h2>What are you bringing to the party?</h2>

              {this.state.partyinfo.categories.map((i) => (
                <Category
                category={i}/>
              ))}

              <form>
                  <button className="submit" onClick={this.handleFormSubmit}>Done</button>
              </form>
          </div>
      );
    }
  }
  
  export default Potluck;