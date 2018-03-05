import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Marker } from 'react-google-maps';
import { PlaceInfoWindow } from './PlaceInfoWindow';

export class PlaceMarker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showTooltip: false,
      animation: window.google.maps.Animation.DROP
    }
  }

  componentWillReceiveProps(){
      if(this.props.bouncedMarker){
          console.log(this.props.bouncedMarker);
      }
  }

  clickTooltip() {
    this.setState({ showTooltip: !this.state.showTooltip, animation: window.google.maps.Animation.BOUNCE })
  }

  closeWindow() {
    this.setState({ showTooltip: false, animation: null })
  }

  selectedMarker(selectedLocationIndex) {
     console.log('selectedMarker', selectedLocationIndex);
  }

  renderMarker(marker){
      console.log('renderMarker', marker);
  }

 
  render() {
    const {showTooltip} = this.state
    const {lat, lng, name, id, photo, marker, bouncedMarker, className} = this.props

    return(
      <Marker
        animation={this.props.bouncedMarker != null  ? window.google.maps.Animation.BOUNCE : null}
        showAnimation={this.props.bouncedMarker}
        markerWithLabel={window.MarkerWithLabel}
        onClick={(e) => this.clickTooltip(marker)}
        position={{
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        }}
        labelClass='map-price-container'
        labelContent={`<div class="map-price-marker"><span>$${name}</span></div>`}
        key={`marker${id}`}>
        {showTooltip && (
          <PlaceInfoWindow key={`info${id}`}
                           name={name}
                           photo={photo}
                           closeWindow={this.closeWindow.bind(this)}/>
        )}
      </Marker>
    );
  }
}

export default PlaceMarker;