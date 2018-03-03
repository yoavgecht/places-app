import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, Row, Col, ControlLabel } from 'react-bootstrap';
const google = window.google;

    class FormComponent extends React.Component {
        constructor(props) {
            super();
            this.placeSearch = '', 
            this.autocomplete = '';
        // this.state = { myLocation: undefined }
        
    };

     state = {
        myLocation: '', 
        lat: '',
        lng: '',
        placeId: ''
    };

    componentDidMount(){
        window.addEventListener('load', this.handleLoad);
    }

    handleLoad = () => {
        this.geolocate();
        this.initAutocomplete();
    }

    

     initAutocomplete = () => {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
       
        this.autocomplete = new window.google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
            {types: ['geocode']});

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        this.autocomplete.addListener('place_changed', this.placeChanged);
      }

    placeChanged = () => {
        this.place = this.autocomplete.getPlace();
        console.log(this.place);
        const splittedAddress = this.place.formatted_address.split(', ');
        const city = splittedAddress[0].toLowerCase();
        const country = splittedAddress[splittedAddress.length - 1].toLowerCase();

        var locationLatLng = {
          name: this.place.name,
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
          placeId: this.place.place_id,
          mapLocationPlacePhoto: this.place.photos ? this.place.photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200}) : '',
          country: country,
          city: city
        }

        this.setState({'myLocation': locationLatLng.name, lat: locationLatLng.lat, lng: locationLatLng.lng, placeId: locationLatLng.placeId});
        this.props.handleLocationChange(locationLatLng, false);
        
    }

     geolocate = () => {
        var self = this;
        var geocoder = new google.maps.Geocoder(); 
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
                var latlng = {lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)};
                geocoder.geocode({'location': latlng}, function(results, status){
                self.locationName = results[0].formatted_address;
                self.placeId = results[0].place_id
                var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    name: self.locationName,
                    placeId: self.placeId
                };

                var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });

                self.autocomplete.setBounds(circle.getBounds());
                self.setState({'myLocation': self.locationName, lat: geolocation.lat, lng: geolocation.lng, placeId: geolocation.placeId});
                self.props.handleLocationChange(geolocation, true);

            });
          });
        }
      }


    handleUserInput(e){
        if(e.currentTarget.value.length >= 2){
            return this.autocomplete.addListener('place_changed', this.placeChanged);
        } else{
            this.setState({myLocation: ''})
        } 
    };

    
    render(){
        return (     
        <Form onSubmit={this.props.handleSubmit}>
            <FormGroup id="formInlineFromDate">
                <ControlLabel className="pull-left">Add a place to the Map</ControlLabel>
                <FormControl name="myLocation" defaultValue={this.state.myLocation} ref="locationInput" id="autocomplete" placeholder='New York' onChange={(event) => this.handleUserInput(event)}/>
            </FormGroup>
            <Button style={{marginBottom: 30}} name="btn" type="submit" bsStyle="success" bsSize="large" block disabled={!this.state.myLocation}>Add Place</Button>
        </Form> 
        )
    };

}

export default FormComponent;