import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import myLocationImage from '../../images/myLocationImage.png';
const google = window.google;


class MapComponent extends Component {

    constructor(){
      super();
      const google = window.google;
      this.state = {
        map: null
      }
    }

    state = {
       isMainMarkerInfoWindowShown: false
    }

    handleMainMarkerClick = () => {
      this.setState({isMainMarkerInfoWindowShown: true})
    }

    handleMainMarkerInfoWindowCloseClick = () => {
      this.setState({isMainMarkerInfoWindowShown: false})
    }

    onMarkerClick = (marker) => {
      marker.showInfo = true;
      this.setState({});
    }

    onMarkerClose = (marker) => {
      marker.showInfo = false; 
    }

    mapLoaded(map){
      console.log
    }


      

    render(){
      const markers = this.props.markers || [];
      return (
        <GoogleMap
          ref={this.mapLoaded.bind(this)}
          zoom={this.props.zoom}
          center={{ lat: this.props.lat, lng: this.props.lng }}>
          {this.props.isMarkerShown && <Marker icon={{url: myLocationImage, scaledSize: new google.maps.Size(32, 32)}} onClick={() => this.handleMainMarkerClick()}  position={{ lat: this.props.lat, lng: this.props.lng }}>
            {this.state.isMainMarkerInfoWindowShown && (<InfoWindow onCloseClick={() => this.handleMainMarkerInfoWindowCloseClick()}>
                    <div>
                     <h3>{this.props.location}</h3> 
                    </div>
                  </InfoWindow>)}
          </Marker>}
          {this.props.markers.map((marker, index) => (
              <Marker key={index} 
               animation={google.maps.Animation.DROP}
               onClick={() => this.onMarkerClick(marker)}
              {...marker} >
                {marker.showInfo && (
                  <InfoWindow onCloseClick={() => this.onMarkerClose(marker)}>
                    <div>
                     <h2>{marker.position.placeName}</h2>
                     <img src={marker.position.placePhoto} alt={marker.position.placeName}/> 
                    </div>
                  </InfoWindow>
                )}
              </Marker>
          ))}
        </GoogleMap>
      )
    }

}


export default withGoogleMap(MapComponent);