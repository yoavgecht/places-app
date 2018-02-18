import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import toastr from 'toastr'; 
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';
import FormComponent from './FormComponent';
import PlacesComponent from './PlacesComponent';
import MapComponent from './MapComponent';
const google = window.google;

class ShowPlacesComponent extends Component {
  
  state = {
	    location: 'Tel Aviv',
	    lat: 31.046051,
	    lng: 34.85161199999993,
      zoom: 7,
      markers: [],
      isMarkerShown: false
	}

  componentWillMount(){
         axios.get('/fetch-destination').then( (response) =>  {
             this.setState({markers: response.data})
         });
  }

   componentDidMount(){
        window.addEventListener('load', this.handleLoad);
    }

    handleLoad = () => {
        this.geolocate();
    }

  handleLocationChange = (locationObj) => {
    return this.setState({location: locationObj.name, lat: locationObj.lat, lng: locationObj.lng, zoom: 10, isMarkerShown: true})
  }

  handleSubmit = (e) => {
        ///send my location to the server
        e.preventDefault();
         axios.post('/fetch-destination', {
            location: {'lat': this.state.lat, 'lng': this.state.lng}
        }).then( (response) =>  {
             this.setState({markers: response.data})
         });
    }

  setLatLng = (latLng) => {
  	this.setState({'lat': latLng.lat, 'lng': latLng.lng});
  }

  handleMarkerClick = (targetMarker) => {
    console.log(targetMarker);
  }

  geolocate = () => {
    var self = this;
    var geocoder = new google.maps.Geocoder(); 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
            var latlng = {lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)};
            geocoder.geocode({'location': latlng}, function(results, status){
            self.locationName = results[0].formatted_address;
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                name: self.locationName
            };

            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            
            self.setState({'myLocation': self.locationName, lat: geolocation.lat, lng: geolocation.lng});
            self.handleLocationChange(geolocation);
        });
      });
    } else {
      toastr.options = {
        "positionClass": "toast-bottom-left",
        "showDuration": "300",
        "hideDuration": "1000"
      }
       toastr.error('Can\'t get your location...');
    }
  }

  
  render() {

    return (
      <div>
        <Row className="show-grid">
           <Col xs={12} sm={12} md={12}>
              <MapComponent 
                onMarkerClick={this.handleMarkerClick}
                onMainMarkerClick={this.handleMainMarkerClick}
                zoom={this.state.zoom}
                containerElement={<div style={{ height: `600px` }} />}
                mapElement={<div style={{ height: `600px` }} />}
                location={this.state.location} 
                branchesLocation={this.state.branchesLocation} 
                lat={this.state.lat}
                lng={this.state.lng}
                markers={this.state.markers}
                isMarkerShown={this.state.isMarkerShown}
                isInfoWindowShown={this.state.isInfoWindowShown}
                />
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={12} sm={12} md={12}>
           {this.state.markers.length > 0 && <PlacesComponent markers={this.state.markers}/>} 
          </Col>
        </Row>
      </div>
        
     
    );
  }
}

export default ShowPlacesComponent;
