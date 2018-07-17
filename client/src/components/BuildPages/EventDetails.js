import React, {Component} from "react";
import {NavLink, Redirect} from "react-router-dom";
import "./../../App.css";

let foodList = [
  {id: 1, name: 'Salad', servings: 2},
  {id: 2, name: 'Entrees', servings: 2},
  {id: 3, name: 'Drinks', servings: 2},
  {id: 4, name: 'Desserts', servings: 2},
  {id: 5, name: 'Disposables', servings: 2},  
  {id: 6, name: 'Miscellaneous', servings: 2}
];

/* class EventDetails extends Component {
    state = {
      toinvites: false
    };
  
    handleFormSubmit = event => {
      event.preventDefault();
      this.setState({toinvites: true});
    };
  
    render() {
        if (this.state.toinvites === true) {
          return <Redirect to='/invites/:id'/>
        }
  */

const Instructions = () => {
  return (
    <div className="title">
      <h2>Party Items</h2>
      <p>What kind of items should your guests bring to the potluck? Choose or delete your categories and set the quantity limits for each one.</p>
    </div>
  );
};
  
const FoodContainer = (props) => {
  return (
    <div className="info">
      <h3>Item Categories</h3>
      {props.items.map(u => {
        return <FoodCard
                  item={u}
                  PM={true}
                  plusServing={props.plusServing}
                  handleClick={props.removeAsItem}
                  minusServing={props.minusServing}/>
      })}
      <form id="create-course-form" onSubmit={props.handleSubmit}>
        <div>
        New Category: 
          <input type="text"/>
        </div>
        <input className="add" type="submit" value="Add" />
      </form>
    </div>
  );
};
  
const FoodCard = (props) => {
  return (
    <div className="menu"
      key={props.item.id}>
      {props.item.name}
        <li>Quantity: {props.item.servings} 
          <PlusMinus minusServing={props.minusServing} MinusProp={props.item.id} plusServing={props.plusServing} PlusProp={props.item.id}/>
        </li>
        <button className="clearButton" onClick={() => props.handleClick(props.item.id)}>x</button>
    </div>
  )
};
  
const PlusMinus = (props) => {
  return (
  <div>
  <button className="plus" onClick={() => props.plusServing(props.PlusProp)}>+</button><button className="minus" onClick={() => props.minusServing(props.MinusProp)}>-</button>
  </div>
    )
};

class EventDetails extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      items: foodList,
      partyItems: foodList
    };
    
    
    this.removeAsItem = this.removeAsItem.bind(this);
    this.plusServing = this.plusServing.bind(this);
    this.minusServing = this.minusServing.bind(this);
  }
  

  
  removeAsItem(userId) {
   
    console.log("here");
    console.log(userId);
    let filteredList = this.state.partyItems.filter(partyItems => partyItems.id !== userId);
    //let filteredList = this.state.partyItems.filter(id => id !== userId);
    this.setState({partyItems: filteredList});
    console.log(filteredList);
    
  }
  
  plusServing(userId) {
    let copy = this.state.partyItems
    let index = copy.findIndex( element => element.id === userId);
    copy[index].servings++;
    this.setState({items:copy});
    console.log(this.state.partyItems);
  }
  
  minusServing(userId) {
    let copy = this.state.partyItems
    let index = copy.findIndex( element => element.id === userId);
    copy[index].servings--;
    this.setState({items:copy});
  }

  handleSubmit = event => {
    event.preventDefault();
    const prevState = this.state.partyItems;
    console.log(event.target[0].value);
    prevState.push({id: foodList.length+1,
                    name: event.target[0].value,
                    servings: 2});
    this.setState({ items: prevState});
    document.getElementById("create-course-form").reset();
    
  }
  
  render() {
    return (
      <div className="container">
        <NavLink to="/home"><img className="logo" src="https://image.ibb.co/kn5pgo/potlucky_logo.png" alt="potlucky_logo"/></NavLink>
        <Instructions/>
        <FoodContainer
          items={this.state.partyItems}
          
          handleSubmit= {this.handleSubmit}
          removeAsItem={this.removeAsItem}
          plusServing = {this.plusServing}
          minusServing = {this.minusServing}/>
        <button class="submit">Submit</button>
      </div>
    );
  }
}

export default EventDetails;