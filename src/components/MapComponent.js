import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";


class MapComponent extends Component {

    constructor(){
      super()
      this.state = {
        map: null
      }
    }

     mapLoaded = (map) => {
       console.log('map loaded', map);
      }

      

    render(){
      const markers = this.props.markers || [];
      return (
        <GoogleMap
          ref={this.mapLoaded.bind(this)}
          zoom={this.props.zoom}
          center={{ lat: this.props.lat, lng: this.props.lng }}>
          {this.props.isMarkerShown && <Marker position={{ lat: this.props.lat, lng: this.props.lng }}  />}
          {this.props.markers.map((marker, index) => (
              <Marker key={index} {...marker} />
          ))}
        </GoogleMap>
      )
    }

}





export default withGoogleMap(MapComponent);