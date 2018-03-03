import React, { Component } from 'react';
import { InfoWindow } from 'react-google-maps';

export class PlaceInfoWindow extends Component {
  render() {
    const {name, photo} = this.props

    return(
      <InfoWindow onCloseClick={this.props.closeWindow}>
        <div>
          <h1>{name}</h1>
          <img src={photo} alt={name} />
        </div>
      </InfoWindow>
    );
  }
}

export default PlaceInfoWindow;