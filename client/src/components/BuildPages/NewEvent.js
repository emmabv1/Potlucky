import React, {Component} from "react";
import {NavLink, Redirect} from "react-router-dom";
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';



class NewEvent extends Component {
    state = {
      todetails: false,
      address: ''
    };
  
    handleChange = address => {
      this.setState({ address });
    };

    handleSelect = address => {
      this.setState({ address });
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => console.log('Success', latLng))
        .catch(error => console.error('Error', error));
    };

    handleFormSubmit = event => {
      event.preventDefault();
      this.setState({todetails: true});
    };
  
    render() {
        if (this.state.todetails === true) {
          return <Redirect to='/details/:id'/>
        }
      return (
          <div className="container">
          <NavLink to="/home"><img className="logo" src="https://image.ibb.co/kn5pgo/potlucky_logo.png" alt="potlucky_logo"/></NavLink>
            <div className="title">
              <h2>Create a new Potluck</h2>
            </div>
  
                  <form> {/*limit is 23 characters*/}
                      <p>Party Name</p>
                      <input
                      type="text"
                      placeholder="Party Name"
                      name="name"
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
                      type="text"
                      placeholder="Date"
                      name="location"
                      />

                      <p>Time</p>
                      <input
                      type="text"
                      placeholder="Time"
                      name="location"
                      />

                      <p>Party Size (optional)</p>
                      <input
                      type="text"
                      placeholder="Address"
                      name="location"
                      />

                      <p>Image(optional)</p>
                      <input
                      type="text"
                      placeholder="Address"
                      name="location"
                      />
                      <div>
                      <button className="submit" onClick={this.handleFormSubmit}>Submit</button>
                      </div>
                  </form>
          </div>
      );
    }
  }
  
  export default NewEvent;



  