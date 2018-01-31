import React from 'react';
import { Button, Form, FormGroup, FormControl, Row, Col, ControlLabel } from 'react-bootstrap';

    class FormComponent extends React.Component {
     constructor(props) {
        super();
        this.google = window.google;
        this.placeSearch = '', 
        this.autocomplete = '';
    };

     state = {
            myLocation: '',
            lat: '',
            lng: ''
        };

    componentDidMount(){
        this.initAutocomplete();
    }

    

     initAutocomplete = () => {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
       
        this.autocomplete = new this.google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
            {types: ['geocode']});

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        this.autocomplete.addListener('place_changed', this.placeChanged);
      }

    placeChanged = () => {
        this.place = this.autocomplete.getPlace();
        var locationLatLng = {
          name: this.place.name,
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
        }

        this.setState({'myLocation': locationLatLng.name, lat: locationLatLng.lat, lng: locationLatLng.lng});
        this.props.handleLocationChange(locationLatLng);
        
    }

     geolocate = () => {
        var self = this;
        var geocoder = new window.google.maps.Geocoder; 
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
                var latlng = {lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)};
                geocoder.geocode({'location': latlng}, function(results, status){
                self.locationName = results[0].formatted_address;
            })
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              name: self.locationName
            };

            

            var circle = new self.google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });

            self.autocomplete.setBounds(circle.getBounds());
            self.setState({'myLocation': self.locationName, lat: geolocation.lat, lng: geolocation.lng});
            self.props.handleLocationChange(geolocation);
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
            <ControlLabel className="pull-left">My Location:</ControlLabel>
            <FormControl name="myLocation" id="autocomplete" onFocus={this.geolocate} placeholder='New York' onChange={(event) => this.handleUserInput(event)}/>
        </FormGroup>
        <Button style={{marginBottom: 30}} name="btn" type="submit" bsStyle="success" bsSize="large" block disabled={!this.state.myLocation}>Send</Button>
        </Form> 
        )
    };

}

export default FormComponent;