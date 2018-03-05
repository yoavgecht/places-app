import React from 'react';

const PlaceComponent = (props) => (
        <li className="col-md-4 destinations" >
            <h4>{props.place.position.placeName}</h4>
            <img className="img-responsive img-location" src={props.place.position.placePhoto} alt={props.place.position.placeName} onMouseOver={(e) => props.handleLocationMouseOver(props.place.position)} onClick={(e) => props.handleLocationClick(props.place.position)}/>
        </li>
    );


export default PlaceComponent;