import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Marker } from 'react-google-maps';
import { PlaceInfoWindow } from './PlaceInfoWindow';

class PlaceMarker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showTooltip: false,
      animation: window.google.maps.Animation.DROP
    }
  }

  clickTooltip() {
    this.setState({ showTooltip: !this.state.showTooltip})
  }

  closeWindow() {
    this.setState({ showTooltip: false, animation: null })
  }
 
  render() {
    const {showTooltip} = this.state
    const {lat, lng, name, id, photo, marker, bouncedMarker, className} = this.props

    return(
      <Marker
        animation={this.props.bouncedMarker != null ? window.google.maps.Animation.BOUNCE : window.google.maps.Animation.DROP}
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
                           closeWindow={this.closeWindow.bind(this)}
                           />
        )}
      </Marker>
    );
  }
}

export default PlaceMarker;