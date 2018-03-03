import React, { Component } from 'react';
import { Marker } from 'react-google-maps';
import { PlaceInfoWindow } from './PlaceInfoWindow';

export class PlaceMarker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showTooltip: false
    }
  }

  clickTooltip() {
    this.setState({ showTooltip: !this.state.showTooltip })
  }

  closeWindow() {
    this.setState({ showTooltip: false })
  }

  render() {
    const {showTooltip} = this.state
    const {lat, lng, name, id, photo} = this.props

    return(
      <Marker
        animation={window.google.maps.Animation.DROP}
        markerWithLabel={window.MarkerWithLabel}
        onClick={this.clickTooltip.bind(this)}
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