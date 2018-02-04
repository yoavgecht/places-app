import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';
import FormComponent from './FormComponent';
import MapComponent from './MapComponent';
import FooterComponent from './FooterComponent';


class HomeComponent extends Component {
  
  state = {
	    location: 'Tel Aviv',
	    lat: 31.046051,
	    lng: 34.85161199999993,
      zoom: 7,
      markers: []
	}

  handleLocationChange = (locationObj) => {
    this.setState({markers: []});
    return this.setState({location: locationObj.name, lat: locationObj.lat, lng: locationObj.lng, zoom: 16})
  }

  handleSubmit = (e) => {
        ///send my location to the server
        e.preventDefault();
         axios.post('/api', {
            location: {'lat': this.state.lat, 'lng': this.state.lng}
        }).then( (response) =>  {
             this.setState({markers: response.data})
             console.log(this.locations);
         });
    }

  setLatLng = (latLng) => {
  	this.setState({'lat': latLng.lat, 'lng': latLng.lng});
  }

  handleMarkerClick = (targetMarker) => {
    console.log(targetMarker);
  }

  

  
  
  render() {

    return (
      <Grid>
        <Row className="show-grid">
           <Col xs={12} sm={12} md={12}>
              <FormComponent handleSubmit={this.handleSubmit} handleLocationChange={this.handleLocationChange} location={this.state.location} lat={this.state.lat} lng={this.state.lng}/>
           </Col>
        </Row>
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
                isMarkerShown={true}
                isInfoWindowShown={this.state.isInfoWindowShown}
                />
          </Col>
        </Row>
          
        <FooterComponent />
      </Grid>
    );
  }
}

export default HomeComponent;
