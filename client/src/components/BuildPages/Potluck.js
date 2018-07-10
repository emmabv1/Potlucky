import React, {Component} from "react";
import {Redirect} from "react-router-dom";
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
    <div>
      <img src={partyinfo.image} style={{height: 100}}/>
      <h1>{partyinfo.name}</h1>
      <h2>{partyinfo.location}</h2>
      <h2>{partyinfo.date} at {partyinfo.time}</h2>
      <h3>Guest count: {partyinfo.guests.length}</h3>
    </div>
    )
  }
}

class Category extends Component {

  state = {
    items: food,
    open: false,
    display: {display: "none"},
    cat: this.props.category
  }

  expand = () => {
      if(this.state.open) {
        this.setState({open: false, display: {display: "none"}})
      }else {
        this.setState({open: true, display: {display: "block"}})
      }
    };
  
  render () {
    return(
      <div>
        <button class="collapsible" onClick={this.expand}>{this.state.cat}</button>
        <div class="content" style={this.state.display}>


          {this.state.items.filter(j => j.category === this.state.cat).map((i) => (
            <Item
              item={i.item}
              guest={i.guest}
            />
          ))}
            

          {/*this.state.items.map((i) => (
            <Item
              item={i.item}
              guest={i.guest}/>
          ))*/}
        
          <form>
            <input
            type="text"
            placeholder="New Item"
            name="newitem"
            />
            <button>Add</button>
          </form>
        </div>
                    
        
      </div>
    )
  }
}



class Item extends Component {
  render() {
    return (
      <div>
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
          <div>
              <EventInfo/>

              <h2>What are you bringing to the party?</h2>

              {this.state.partyinfo.categories.map((i) => (
                <Category
                category={i}/>
              ))}

              
              

              <form>
                  <button onClick={this.handleFormSubmit}>Done</button>
              </form>
          </div>
      );
    }
  }
  
  export default Potluck;