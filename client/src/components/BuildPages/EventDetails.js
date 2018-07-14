import React, {Component} from "react";
import {Redirect} from "react-router-dom";
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
        <h2>Instructions</h2>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetu</p>
      </div>
    );
  };
  
  const FoodContainer = (props) => {
    return (
      <div className="info">
        <h3>Add an Item To Your Party!</h3>
        {props.items.map(u => {
          return <FoodCard
                   item={u}
                   handleClick={props.addAsItem}/>
        })}
        <form id="create-course-form" onSubmit={props.handleSubmit}>
          <label>
          New Item:
            <input type="text"/>
          </label>
          <input class="submit" type="submit" value="Add" />
        </form>
      </div>
    );
  };
  
  const PartyContainer = (props) => {
    return (
      <div>
        <h3>Your Party Items!!</h3>
        {props.partyItems.map(u => {
            return <FoodCard
                     item={u}
                     handleClick={props.removeAsItem}
                     PM={true}
                     plusServing={props.plusServing}
                     minusServing={props.minusServing}/>
        })}
      </div>
    );
  };
  
  const FoodCard = (props) => {
    return (
      <div className="menu" onClick={() => props.handleClick(props.item.id)}
        key={props.item.id}>
        {props.item.name}
        {props.PM 
          ? (<li>servings: {props.item.servings} 
            <PlusMinus minusServing={props.minusServing} MinusProp={props.item.id} plusServing={props.plusServing} PlusProp={props.item.id}/></li>)
          : null}
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
        partyItems: [2]
      };
      
      this.hydrateUser = this.hydrateUser.bind(this);
      this.addAsItem = this.addAsItem.bind(this);
      this.removeAsItem = this.removeAsItem.bind(this);
      this.plusServing = this.plusServing.bind(this);
      this.minusServing = this.minusServing.bind(this);
    }
  

    hydrateUser(userId) {
      return this.state.items.find(u => u.id === userId);
    }
    
    addAsItem(userId) {
      this.setState((prevState, props) => {
        let partyItems = new Set([...prevState.partyItems, userId]);
        return {partyItems: [...partyItems]};
      });
    }
    
    removeAsItem(userId) {
      this.setState((prevState, props) => {
        let partyItems = this.state.partyItems.filter(id => id !== userId);
        return {partyItems};
      });
    }
    
     plusServing(userId) {
        let copy = this.state.items
        let index = copy.findIndex( element => element.id === userId);
        copy[index].servings++;
        this.setState({items:copy});
     }
    
     minusServing(userId) {
        let copy = this.state.items
        let index = copy.findIndex( element => element.id === userId);
        copy[index].servings--;
        this.setState({items:copy});
     }

     handleSubmit = event => {
      event.preventDefault();
      const prevState = this.state.items;
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
          <Instructions />
          <FoodContainer
            items={this.state.items}
            addAsItem= {this.addAsItem}
            handleSubmit= {this.handleSubmit}/>
          <PartyContainer 
            partyItems={this.state.partyItems.map(this.hydrateUser)}
            removeAsItem={this.removeAsItem}
            plusServing = {this.plusServing}
            minusServing = {this.minusServing}>
            <div>123</div>
          </PartyContainer>
          <button class="submit">Submit</button>
        </div>
      );
    }
  }


  export default EventDetails;