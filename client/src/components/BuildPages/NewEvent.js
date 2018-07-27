import React, {Component} from "react";
import {NavLink, Redirect} from "react-router-dom";
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import axios from "axios";

class NewEvent extends Component {
  state = {
    todetails: false,
    partyName: "",
    address: "",
    date: "",
    time: "",
    limit: "",
    image: "",
  };
  
  userqueryid = this.props.match.params.userid;

  componentDidMount(){
      axios.get(`/api/users/${this.userqueryid}`)
        .then(res => this.setState ({user: res.data}))
        .then(() => console.log(this.state.user));
  }
  
  handleChange = address => {
    this.setState({address});
  };

  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    axios.post(`/api/parties`, {
      partyName: this.state.partyName,
      host: this.state.user.id,
      address: this.state.address,
      date: this.state.date,
      time: this.state.time,
      limit: this.state.limit,
      image: this.state.image,
      itemCategories: "[\"Entrees\",\"Salad\",\"Beverages\",\"Desserts\",\"Miscellaneous\"]",
    })
    .then(res => this.setState ({newparty: res.data}))
    .then(() => console.log(this.state.newparty))
    .then(() => this.setState({todetails: true}));
  };
  
  render() {
    if (this.state.todetails === true) {
      return <Redirect to={"/"+this.userqueryid+"/"+this.state.newparty.id+"/details"}/>
    }

    if (this.state.user) {
      return (
        <div className="container">
        <NavLink to={"/"+this.userqueryid+"/home"}><img className="logo" src="https://image.ibb.co/kn5pgo/potlucky_logo.png" alt="potlucky_logo"/></NavLink>
          <div className="title">
            <h2>Create a new Potluck</h2>
          </div>

          <form> {/*limit is 23 characters*/}
            <div className="submit frame">
              <p>Party Name</p>
              <input
              type="text"
              name="partyName"
              value={this.state.partyName}
              onChange={this.handleInputChange}
              />

              <p>Location</p>
              <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input',
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                          : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>

              <p>Date</p>
              <input
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.handleInputChange}
              />

              <p>Time</p>
              <input
              type="time"
              name="time"
              value={this.state.time}
              onChange={this.handleInputChange}
              />

              <p>Party Size (optional)</p>
              <input
              type="number"
              name="limit"
              value={this.state.limit}
              onChange={this.handleInputChange}
              />

              <p>Image (optional)</p>
              <label className="upload">Upload Image
                <input                     
                type="file"
                name="image"
                accept="image/*"
                value={this.state.image}
                onChange={this.handleInputChange}
                />
              </label>
            </div>

            <div>
            <button className="submit" onClick={this.handleFormSubmit} formMethod="POST">Submit</button>
            </div>
          </form>
        </div>
    );
    }
    return(<div></div>)
  }
}

export default NewEvent;



  