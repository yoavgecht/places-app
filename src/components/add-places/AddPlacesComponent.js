import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import toastr from 'toastr'; 
import myLocationImage from '../../images/myLocationImage.png';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';
import PlacesComponent from './PlacesComponent';
import FormComponent from './FormComponent';
import MapComponent from './MapComponent';



class addPlacesComponent extends Component {
  
  state = {
      mapLat: 0,
      mapLng: 0,
      mapLocation: '',
	    userlocation: '',
      userLocationMarkerLat: 0,
      userLocationMarkerLng: 0,
      addedMarkerLat: 0,
      addedMarkerLng: 0,
      userLoactionPlacePhoto: '',
      mapLocationPlacePhoto: '',
      zoom: 2,
      markers: [],
      isUserLocationMarkerShown: false,
      placeId: 'ChIJi8mnMiRJABURuiw1EyBCa2o',
      MainMarkerIconUrl: myLocationImage,
      isMainMarkerInfoWindowShown: false,
	}

  componentWillMount(){
      this.fetchDestinations();
  }

  fetchDestinations = () => {
    axios.get('/fetch-destination').then( (response) =>  {
          this.setState({markers: response.data})
      });
  } 

  handleLocationChange = (locationObj, isCurrentLocation) => {
    if(isCurrentLocation){
       this.setState({isUserLocationMarkerShown: false, isMainMarkerInfoWindowShown: false});
       this.setState({userLocation: locationObj.name, userLocationMarkerLat: locationObj.lat, userLocationMarkerLng: locationObj.lng, isUserLocationMarkerShown: true, mapLat: locationObj.lat, mapLng: locationObj.lng,
                  placeId: locationObj.placeId, userLoactionPlacePhoto: locationObj.placePhoto, zoom: 8, mainMarkerLat: locationObj.mainMarkerLat, mainMarkerLng: locationObj.mainMarkerLng});
    } else {
       this.setState({isUserLocationMarkerShown: true, isMainMarkerInfoWindowShown: false});
       this.setState({mapLocation: locationObj.name, isUserLocationMarkerShown: true, mapLat: locationObj.lat, mapLng: locationObj.lng,
                  placeId: locationObj.placeId, mapLocationPlacePhoto: locationObj.mapLocationPlacePhoto, zoom: 8, mainMarkerLat: locationObj.mainMarkerLat, mainMarkerLng: locationObj.mainMarkerLng});
    }  
  }

  handleSubmit = (e) => {
        ///send my location to the server
        e.preventDefault();
         axios.post('/add-destination', {
            location: {'lat': this.state.mapLat, 'lng': this.state.mapLng, locationName: this.state.mapLocation, placePhoto: this.state.mapLocationPlacePhoto}
        }).then( (response) =>  {
            this.fetchDestinations();
             console.log(response);
             toastr.options = {
                "positionClass": "toast-bottom-left",
                "showDuration": "300",
                "hideDuration": "1000"
              }
            if(response.data.length > 0 && response.data != "recordExists"){
              toastr.success('Destination added successfuly.');
              
            } else if(response.data == "recordExists"){
                toastr.warning('Destination already added.');
            } else if(response.data == "error"){
              toastr.error('Something went wrong');
            }
         });
    }

  setLatLng = (latLng) => {
  	this.setState({'lat': latLng.lat, 'lng': latLng.lng});
  }

  handleMarkerClick = (targetMarker) => {
    this.setState({isMainMarkerInfoWindowShown: true})
  }

  handleInfoWindowCloseClick = () => {
    this.setState({isMainMarkerInfoWindowShown: false})
  }

  handleMainMarkerClick = (targetMarker) => {
    console.log(targetMarker);
  }

  handleLocationClick = (place) => {
      this.setState({mapLat: place.lat, mapLng: place.lng, zoom: 6})
  }

  

  
  
  render() {

    return (
        
        <Row className="show-grid">
        <Col xs={12} sm={12} md={12}>
           <h1 className="headline">Plan your trip</h1>
          </Col>
           <Col xs={12} sm={12} md={12}>
              <FormComponent handleSubmit={this.handleSubmit} handleLocationChange={this.handleLocationChange} location={this.state.location} lat={this.state.lat} lng={this.state.lng}/>
                <MapComponent
                handleLocationClick={this.handleLocationClick}
                placePhoto={this.state.placePhoto}
                placeId={this.state.placeId} 
                onMarkerClick={this.handleMarkerClick}
                onInfoWindowCloseClick={this.handleInfoWindowCloseClick}
                onMainMarkerClick={this.handleMainMarkerClick}
                zoom={this.state.zoom}
                containerElement={<div style={{ height: `650px` }} />}
                mapElement={<div style={{ height: `600px` }} />}
                location={this.state.location} 
                branchesLocation={this.state.branchesLocation}
                mapLat={this.state.mapLat}
                mapLng={this.state.mapLng} 
                userLocationMarkerLat={this.state.userLocationMarkerLat}
                userLocationMarkerLng={this.state.userLocationMarkerLng}
                addedMarkerLat={this.state.addedMarkerLat}
                addedMarkerLng={this.state.addedMarkerLng}
                markers={this.state.markers}
                isUserLocationMarkerShown={this.state.isUserLocationMarkerShown}
                isMainMarkerInfoWindowShown={this.state.isMainMarkerInfoWindowShown}
                />
           </Col>
            <Col xs={12} sm={12} md={12}>
                {this.state.markers.length > 0 && <PlacesComponent markers={this.state.markers} handleLocationClick={this.handleLocationClick}/>} 
          </Col>
        </Row>        
    );
  }
}

export default addPlacesComponent;
