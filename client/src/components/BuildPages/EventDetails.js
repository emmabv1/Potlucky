import React, {Component} from "react";
import {NavLink, Redirect} from "react-router-dom";
import "./../../App.css";
import axios from "axios";

{/*This is the object that holds the established presets of catergories*/}
let foodList = [
  {id: 1, name: 'Salad', servings: 2},
  {id: 2, name: 'Entrees', servings: 2},
  {id: 3, name: 'Drinks', servings: 2},
  {id: 4, name: 'Desserts', servings: 2},
  {id: 5, name: 'Disposables', servings: 2},  
  {id: 6, name: 'Miscellaneous', servings: 2}
];

{/*Instructions.... yep thats all that this is*/}
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
      {/*This Loops through all of the preset items listed in the above object and applies them individually to a FoodCard */}
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
      partyItems: foodList,
      toinvites: false
    };
    
    this.removeAsItem = this.removeAsItem.bind(this);
    this.plusServing = this.plusServing.bind(this);
    this.minusServing = this.minusServing.bind(this);
  }

  userqueryid = this.props.match.params.userid;
  partyqueryid = this.props.match.params.eventid;
  
  removeAsItem(userId) {
   
    console.log("here");
    console.log(userId);
    {/*This function takes the object of partyIteams and filters out the item that the users does not want anymore*/}
    {/*This happens by having filteredList = everything in partyItems besides the id of the item that is not wanted*/}
    let filteredList = this.state.partyItems.filter(partyItems => partyItems.id !== userId);
    {/*The state is then set so that partyItems in now equal to the filteredList*/}
    this.setState({partyItems: filteredList});
    console.log(filteredList);
    
  }
  
  plusServing(userId) {
    {/*This grabs the id of the item being clicked on and changes the state for its servings*/}
    let copy = this.state.partyItems
    let index = copy.findIndex( element => element.id === userId);
    copy[index].servings++;
    this.setState({items:copy});
    console.log(this.state.partyItems);
  }
  
  minusServing(userId) {
    {/*This grabs the id of the item being clicked on and changes the state for its servings*/}
    let copy = this.state.partyItems
    let index = copy.findIndex( element => element.id === userId);
    copy[index].servings--;
    this.setState({items:copy});
  }

  handleSubmit = event => {
    {/*This adds an item to the partyItems array from the new item form*/}
    event.preventDefault();
    const prevState = this.state.partyItems;
    console.log(event.target[0].value);
    prevState.push({id: foodList.length+1,
                    name: event.target[0].value,
                    servings: 2});
    this.setState({ items: prevState});
    document.getElementById("create-course-form").reset();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({toinvites: true});
  };
  
  render() {
    if (this.state.toinvites === true) {
      return <Redirect to={"/"+this.userqueryid+"/:eventid/invites"}/>
    }
    return (
      <div className="container">
        <NavLink to={"/"+this.userqueryid+"/home"}><img className="logo" src="https://image.ibb.co/kn5pgo/potlucky_logo.png" alt="potlucky_logo"/></NavLink>
        <Instructions/>
        <FoodContainer
          items={this.state.partyItems}
          handleSubmit= {this.handleSubmit}
          removeAsItem={this.removeAsItem}
          plusServing = {this.plusServing}
          minusServing = {this.minusServing}/>
        <button className="submit" onClick={this.handleFormSubmit}>Submit</button>
      </div>
    );
  }
}

export default EventDetails;