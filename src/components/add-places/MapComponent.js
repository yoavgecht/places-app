import React, { Component } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import myLocationImage from '../../images/myLocationImage.png';
import PlaceMarker from './PlaceMarker';


  const MapComponent = withScriptjs(withGoogleMap((props) => 
  <GoogleMap
          containerElement={props.containerElement}
          loadingElement={props.loadingElement}
          mapElement={props.mapElement}
          handleLocationClick={props.handleLocationClick}
       
          zoom={props.zoom}
          center={{ lat: props.mapLat, lng: props.mapLng }}>
          {props.isUserLocationMarkerShown && <Marker placeId={props.placeId} onClick={props.handleMainMarkerClick} icon={{url: myLocationImage}} position={{lat: props.userLocationMarkerLat, lng: props.userLocationMarkerLng}} animation={window.google.maps.Animation.DROP}>
            {props.isMainMarkerInfoWindowShown && (<InfoWindow onCloseClick={props.handleMainMarkerInfoWindowCloseClick}>
                    <div className="info-window-container">
                     <h3>{props.location}</h3>
                     <img src={props.placePhoto} alt=""/> 
                    </div>
                  </InfoWindow>)}
          </Marker>}
          {props.markers.length > 0 && props.markers.map((marker, index) => (
              <PlaceMarker key={`marker${marker.position.id}`} 
                           id={marker.position.id}
                           lat={marker.position.lat}
                           lng={marker.position.lng}
                           name={marker.position.placeName}
                           photo={marker.position.placePhoto}
                           locationMarkerClicked={props.locationMarkerClicked}
                           className={props.locationMarkerClicked.position &&  props.locationMarkerClicked.position.id == marker.position.id ? 'markerAnimation' : null}
                           bouncedMarker={props.locationMarkerClicked.position &&  props.locationMarkerClicked.position.id == marker.position.id ? props.locationMarkerClicked: null}
                           marker={marker}
                            />
                ))}
           {props.addedMarkerLat  &&  props.addedMarkerLng ? <Marker position={{lat: props.addedMarkerLat, lng: props.addedMarkerLng}} animation={window.google.maps.Animation.DROP} >
          </Marker> : null}
        </GoogleMap>
));

export default MapComponent;