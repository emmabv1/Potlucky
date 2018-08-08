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
                  handleImageSelection={props.handleImageSelection}
                />
      })}
    </div>
  );
};

const ImageCard = (props) => {
  return (
    <div className="avatarBox" onClick={props.handleImageSelection(props.image)}>
      <input type="image" className="avatarImg" src={props.image.url} onClick={props.handleImageSelection(props.image)} />
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
    this.handleImageSelection1 = this.handleImageSelection1.bind(this);
    this.handleImageSelection2 = this.handleImageSelection2.bind(this);
    this.handleImageSelection3 = this.handleImageSelection3.bind(this);
    this.handleImageSelection4 = this.handleImageSelection4.bind(this);
    this.handleImageSelection5 = this.handleImageSelection5.bind(this);
    this.handleImageSelection6 = this.handleImageSelection6.bind(this);
    this.handleImageSelection7 = this.handleImageSelection7.bind(this);
    this.handleImageSelection8 = this.handleImageSelection8.bind(this);
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

  openModal(event) {
    event.preventDefault();
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
 
  closeModal(event) {
    event.preventDefault();
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

  handleImageSelection1 = () => {
    console.log("toast")
    this.setState({
      image:"https://cdn.iconscout.com/public/images/icon/free/png-512/campfire-forest-wildlife-outdoor-fire-camping-3ba3ca15ed75d995-512x512.png"
    });
  };

  handleImageSelection2 = () => {
    console.log("toast")
    this.setState({
      image:"https://raw.githubusercontent.com/butterproject/artworks/master/Popcorn/Popcorn-Icon/popcorntime-win01.png"
    });
    
  };

  handleImageSelection3 = () => {
    console.log("toast")
    this.setState({
      image:"http://icons.iconarchive.com/icons/google/noto-emoji-activities/1024/52707-party-popper-icon.png"
    });
    
  };

  handleImageSelection4 = () => {
    console.log("toast")
    this.setState({
      image:"https://cdn0.iconfinder.com/data/icons/valentine-s-day-19/64/Wine_glass-01-512.png"
    });
    
  };

  handleImageSelection5 = () => {
    console.log("toast")
    this.setState({
      image:"https://images.vexels.com/media/users/3/135475/isolated/preview/b8f128f69a59a8dcb9119b4c49342061-hervir-el-icono-de-crisol-del-fuego-by-vexels.png"
    });
    
  };

  handleImageSelection6 = () => {
    console.log("toast")
    this.setState({
      image:"http://anditsg.one/img/bbq.png"
    });
    
  };

  handleImageSelection7 = () => {
    console.log("toast")
    this.setState({
      image:"http://icons.iconarchive.com/icons/dapino/beach/256/sun-umbrella-icon.png"
    });
    
  };

  handleImageSelection8 = () => {
    console.log("toast")
    this.setState({
      image:"https://image.ibb.co/eVQ1ae/dice.png"
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
      //  .this.setState({todetails: true})});
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
            </div>

            <div>
            <button className="submit" onClick={this.handleFormSubmit} formMethod="POST">Submit</button>
            </div>
          </form>

          <p>Image (optional)</p>
              <button onClick={this.openModal}>Open Modal</button>
              <img className="photo" src={this.state.image}/>
              <Modal
          handleImageSelection={this.handleImageSelection1}
          handleImageSelection={this.handleImageSelection2}
          handleImageSelection={this.handleImageSelection3}
          handleImageSelection={this.handleImageSelection4}
          handleImageSelection={this.handleImageSelection5}
          handleImageSelection={this.handleImageSelection6}
          handleImageSelection={this.handleImageSelection7}
          handleImageSelection={this.handleImageSelection8}
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <input type="image" className="avatarImg" src="https://cdn.iconscout.com/public/images/icon/free/png-512/campfire-forest-wildlife-outdoor-fire-camping-3ba3ca15ed75d995-512x512.png" onClick={this.handleImageSelection1} />
          <input type="image" className="avatarImg" src="https://raw.githubusercontent.com/butterproject/artworks/master/Popcorn/Popcorn-Icon/popcorntime-win01.png" onClick={this.handleImageSelection2} />
          <input type="image" className="avatarImg" src="http://icons.iconarchive.com/icons/google/noto-emoji-activities/1024/52707-party-popper-icon.png" onClick={this.handleImageSelection3} />
          <input type="image" className="avatarImg" src="https://cdn0.iconfinder.com/data/icons/valentine-s-day-19/64/Wine_glass-01-512.png" onClick={this.handleImageSelection4} />
          <input type="image" className="avatarImg" src="https://images.vexels.com/media/users/3/135475/isolated/preview/b8f128f69a59a8dcb9119b4c49342061-hervir-el-icono-de-crisol-del-fuego-by-vexels.png" onClick={this.handleImageSelection5} />
          <input type="image" className="avatarImg" src="http://anditsg.one/img/bbq.png" onClick={this.handleImageSelection6} />
          <input type="image" className="avatarImg" src="http://icons.iconarchive.com/icons/dapino/beach/256/sun-umbrella-icon.png" onClick={this.handleImageSelection7} />
          <input type="image" className="avatarImg" src="https://image.ibb.co/eVQ1ae/dice.png" onClick={this.handleImageSelection8} />
        </Modal>
        </div>
    );
    }
    return(<div></div>)
  }
}

export default NewEvent;



  