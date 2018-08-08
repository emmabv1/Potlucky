import React, {Component} from "react";
import Modal from 'react-modal';
import {NavLink, Redirect} from "react-router-dom";
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import axios from "axios";

Modal.setAppElement('#root')

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const AvatarContainer = (props) => {
  return (
    <div className="">
      <h3>Pick Your Image</h3>
      {/*This Loops through all of the preset items listed in the above object and applies them individually to a FoodCard */}
      {props.images.map(u => {
        return <ImageCard
                  image={u}
                />
      })}
    </div>
  );
};

const ImageCard = (props) => {
  return (
    <div className="avatarBox">
      <img className="avatarImg" src={props.image.url} />
    </div>
  )
};

class NewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todetails: false,
      partyName: "",
      address: "",
      date: "",
      time: "",
      limit: "",
      image: "",
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  };

  images = [
    {url: "https://cdn.iconscout.com/public/images/icon/free/png-512/campfire-forest-wildlife-outdoor-fire-camping-3ba3ca15ed75d995-512x512.png"},
    {url: "https://raw.githubusercontent.com/butterproject/artworks/master/Popcorn/Popcorn-Icon/popcorntime-win01.png"},
    {url: "http://icons.iconarchive.com/icons/google/noto-emoji-activities/1024/52707-party-popper-icon.png"},
    {url: "https://cdn0.iconfinder.com/data/icons/valentine-s-day-19/64/Wine_glass-01-512.png"},
    {url: "https://images.vexels.com/media/users/3/135475/isolated/preview/b8f128f69a59a8dcb9119b4c49342061-hervir-el-icono-de-crisol-del-fuego-by-vexels.png"},
    {url: "http://anditsg.one/img/bbq.png"},
    {url: "http://icons.iconarchive.com/icons/dapino/beach/256/sun-umbrella-icon.png"},
    {url: "https://image.ibb.co/eVQ1ae/dice.png"}
  ]

  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

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
      hostId: this.state.user.id,
      hostName: this.state.user.name,
      address: this.state.address,
      date: this.state.date,
      time: this.state.time,
      limit: this.state.limit,
      image: this.state.image,
     // itemCategories: "[\"Entrees\",\"Salad\",\"Beverages\",\"Desserts\",\"Miscellaneous\"]",
    })
    .then(res => this.setState ({newparty: res.data}))
    .then(() => {
      let uID = this.state.user.id;
      console.log(uID);
      let pID = this.state.newparty.id;
      console.log(pID);

      // axios.get(`/api/users/${this.userqueryid}`)
      //   .then(res => this.setState ({user: res.data}))
      //   .then(() => console.log(this.state.user));

      axios.post(`/api/userparty`, {userId: uID, partyId: pID,})
        .then(() => this.setState({todetails: true}));
        //this.setState({todetails: true})});
  })};
  
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
              <button onClick={this.openModal}>Open Modal</button>
              <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <AvatarContainer 
            images={this.images}
          />
        </Modal>
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



  