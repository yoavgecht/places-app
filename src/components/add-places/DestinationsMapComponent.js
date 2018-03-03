import React from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { compose, withProps } from "recompose"
import myLocationImage from '../../images/myLocationImage.png';


const DestinationsMapComponent = withGoogleMap(props => (
  <GoogleMap
          containerElement={props.containerElement}
          loadingElement={props.loadingElement}
          mapElement={props.mapElement}
          handleLocationClick={props.handleLocationClick}
          ref={props.mapLoaded.bind(this)}
          zoom={props.zoom}
          center={{ lat: props.mapLat, lng: props.mapLng }}>
          {props.isUserLocationMarkerShown && <Marker placeId={props.placeId} onClick={this.handleMainMarkerClick} icon={{url: myLocationImage}} position={{lat: props.userLocationMarkerLat, lng: props.userLocationMarkerLng}} animation={window.google.maps.Animation.DROP}>
            {props.isMainMarkerInfoWindowShown && (<InfoWindow onCloseClick={this.handleMainMarkerInfoWindowCloseClick}>
                    <div className="info-window-container">
                     <h3>{props.location}</h3>
                     <img src={props.placePhoto} alt=""/> 
                    </div>
                  </InfoWindow>)}
          </Marker>}
          {props.markers.map((marker, index) => (
              <Marker key={index} 
               animation={window.google.maps.Animation.DROP}
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
           {props.addedMarkerLat  &&  props.addedMarkerLat ? <Marker position={{lat: props.addedMarkerLat, lng: props.addedMarkerLng}} animation={window.google.maps.Animation.DROP} >
          </Marker> : null}
        </GoogleMap>
));

export default DestinationsMapComponent