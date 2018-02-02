import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";


class MapComponent extends Component {

    constructor(){
      super()
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


      

    render(){
      const markers = this.props.markers || [];
      return (
        <GoogleMap
          zoom={this.props.zoom}
          center={{ lat: this.props.lat, lng: this.props.lng }}>
          {this.props.isMarkerShown && <Marker onClick={() => this.handleMainMarkerClick()}  position={{ lat: this.props.lat, lng: this.props.lng }}>
            {this.state.isMainMarkerInfoWindowShown && (<InfoWindow onCloseClick={() => this.handleMainMarkerInfoWindowCloseClick()}>
                    <div>
                     <h1>myinfowindow</h1> 
                    </div>
                  </InfoWindow>)}
          </Marker>}
          {this.props.markers.map((marker, index) => (
              <Marker key={index} 
               animation={window.google.maps.Animation.DROP}
               onClick={() => this.onMarkerClick(marker)}
              {...marker} >
                {marker.showInfo && (
                  <InfoWindow onCloseClick={() => this.onMarkerClose(marker)}>
                    <div>
                     <h1>myinfowindow</h1> 
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