import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import toastr from 'toastr'; 
import myLocationImage from '../../images/myLocationImage.png';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';
import PlacesComponent from './PlacesComponent';
import PlacesDataComponent from './PlacesDataComponent';
import FormComponent from './FormComponent';
import MapComponent from './MapComponent';
import LoaderComponent from './LoaderComponent';




class addPlacesComponent extends Component {
  constructor(props) {
    super(props)
    const google = window.google
  }


  state = {
      map: null,
      mapLat: 0,
      mapLng: 0,
      mapLocation: '',
	    userlocation: '',
      userLocationMarkerLat: 0,
      userLocationMarkerLng: 0,
      city: '',
      country: '',
      addedMarkerLat: 0,
      addedMarkerLng: 0,
      userLoactionPlacePhoto: '',
      mapLocationPlacePhoto: '',
      zoom: 2,
      markers: [],
      isUserLocationMarkerShown: false,
      placeId: '',
      MainMarkerIconUrl: myLocationImage,
      isMainMarkerInfoWindowShown: false,
      placeData: [],
      showMarkerInfoWindow: false,
      locationMarkerClicked: ''
	}

  componentWillMount(){
      this.fetchDestinations();
  }

  fetchDestinations = () => {
    axios.get('/api/fetch-destination').then( (response) =>  {
          this.setState({markers: response.data})
      });
  } 

  handleLocationChange = (locationObj, isCurrentLocation) => {
    if(isCurrentLocation){
       this.setState({isUserLocationMarkerShown: false, isMainMarkerInfoWindowShown: false});
       this.setState({userLocation: locationObj.name, userLocationMarkerLat: locationObj.lat, userLocationMarkerLng: locationObj.lng, isUserLocationMarkerShown: true, mapLat: locationObj.lat, mapLng: locationObj.lng,
                  placeId: locationObj.placeId, userLoactionPlacePhoto: locationObj.placePhoto, zoom: 8, mainMarkerLat: locationObj.mainMarkerLat, mainMarkerLng: locationObj.mainMarkerLng, city: locationObj.city, country: locationObj.country});
    } else {
       this.setState({isUserLocationMarkerShown: true, isMainMarkerInfoWindowShown: false});
       this.setState({mapLocation: locationObj.name, isUserLocationMarkerShown: true, mapLat: locationObj.lat, mapLng: locationObj.lng,
                  placeId: locationObj.placeId, mapLocationPlacePhoto: locationObj.mapLocationPlacePhoto, zoom: 8, mainMarkerLat: locationObj.mainMarkerLat, mainMarkerLng: locationObj.mainMarkerLng, city: locationObj.city, country: locationObj.country});
    }  
  }

  handleSubmit = (e) => {
        ///send my location to the server
        e.preventDefault();
          console.log(this.state.city);
           console.log(this.state.country);
         axios.post('/api/add-destination', {
            location: {'lat': this.state.mapLat, 'lng': this.state.mapLng, locationName: this.state.mapLocation, placePhoto: this.state.mapLocationPlacePhoto, city: this.state.city, country: this.state.country}
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
    this.setState({showMarkerInfoWindow: true});
  }

  handleInfoWindowCloseClick = () => {
    this.setState({isMainMarkerInfoWindowShown: false})
  }


  handleLocationMouseOver = (place) => {
      this.handleSelectMarker(place)
       this.setState({mapLat: place.lat, mapLng: place.lng, zoom: 6})
  }

  handleLocationClick = (place) => {
    axios.post('/api/fetch-destination-data', {
            city: place.city,
            country: place.country
          }).then( (response) =>  {
            this.setState({placeData: response.data.experiencesResults});
         });
  }

    handleMainMarkerClick = () => {
      this.onMarkerClick()
    }

    handleMainMarkerInfoWindowCloseClick = () => {
      this.onInfoWindowCloseClick()
    }

    handleMarkerClose = (marker) => {
     this.setState({showMarkerInfoWindow: false}); 
    }

    mapLoaded(Marker){
    
    }

    handleMarkerClick = (marker) =>{
      this.setState({showMarkerInfoWindow: !this.state.showMarkerInfoWindow, mapLat: marker.position.lat, mapLng: marker.position.lng});
    }

    handleSelectMarker = (place) => {
       const markerId = place.id;
       const index = this.state.markers.findIndex(marker => marker.position.id === markerId);
       this.setState({locationMarkerClicked: this.state.markers[index]});
    }
  

  
  
  render() {

    return (
        <div>
        <Row className="show-grid">
        <Col xs={12} sm={12} md={12}>
            <FormComponent handleSubmit={this.handleSubmit} handleLocationChange={this.handleLocationChange} location={this.state.location} lat={this.state.lat} lng={this.state.lng}/>
        </Col>
        </Row>
        <Row className="show-grid">
              <Col xs={12} sm={12} md={6}>
                <MapComponent
                handleLocationClick={this.handleLocationClick}
                placePhoto={this.state.placePhoto}
                placeId={this.state.placeId} 
                onMarkerClick={this.handleMarkerClick}
                onMarkerClose={this.handleMarkerClose}
                isMarkerInfoWindowOpen={this.state.showMarkerInfoWindow}
                onInfoWindowCloseClick={this.handleInfoWindowCloseClick}
                onMainMarkerClick={this.handleMainMarkerClick}
                zoom={this.state.zoom}
                containerElement={<div className="map" style={{ height: `650px`}} />}
                mapElement={<div style={{ height: `100%` }} />}
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
                locationMarkerClicked={this.state.locationMarkerClicked}
                />
           </Col>
            <Col xs={12} sm={12} md={6}>
                {this.state.markers.length > 0 ? <PlacesComponent markers={this.state.markers} handleLocationMouseOver={this.handleLocationMouseOver} handleLocationClick={this.handleLocationClick}/> : <LoaderComponent />} 
            </Col>
        </Row>
         <Row className="show-grid">
          <Col xs={12} sm={12} md={12}>
                 {this.state.placeData.length > 0 && <PlacesDataComponent placeData={this.state.placeData} />}
          </Col>
         </Row> 
         </div>       
    );
  }
}

export default addPlacesComponent;
