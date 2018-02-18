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
      this.props.onMarkerClick()
    }

    handleMainMarkerInfoWindowCloseClick = () => {
      this.props.onInfoWindowCloseClick()
    }

    onMarkerClick = (marker) => {
      console.log(marker);
      marker.showInfo = true;
      // marker.setAnimation(google.maps.Animation.BOUNCE);
      this.setState({});
    }

    onMarkerClose = (marker) => {
      marker.showInfo = false; 
    }

    mapLoaded(Marker){
    
    }

    handleLocationClick = () => {
      this.props.handleLocationClick({})
    }


      

    render(){
      const markers = this.props.markers || [];
      return (
        <GoogleMap
          handleLocationClick={this.handleLocationClick}
          ref={this.mapLoaded.bind(this)}
          zoom={this.props.zoom}
          center={{ lat: this.props.mapLat, lng: this.props.mapLng }}>
          {this.props.isUserLocationMarkerShown && <Marker placeId={this.props.placeId} onClick={this.handleMainMarkerClick} icon={{url: myLocationImage}} position={{lat: this.props.userLocationMarkerLat, lng: this.props.userLocationMarkerLng}} animation={google.maps.Animation.DROP}>
            {this.props.isMainMarkerInfoWindowShown && (<InfoWindow onCloseClick={this.handleMainMarkerInfoWindowCloseClick}>
                    <div className="info-window-container">
                     <h3>{this.props.location}</h3>
                     <img src={this.props.placePhoto} alt=""/> 
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
           {this.props.addedMarkerLat  &&  this.props.addedMarkerLat ? <Marker position={{lat: this.props.addedMarkerLat, lng: this.props.addedMarkerLng}} animation={google.maps.Animation.DROP} >
          </Marker> : null}
        </GoogleMap>
      )
    }

}


export default withGoogleMap(MapComponent);