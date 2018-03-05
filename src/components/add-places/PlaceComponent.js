import React from 'react';

const PlaceComponent = (props) => (
        <li className="col-md-4 destinations" onMouseOver={(e) => props.handleLocationMouseOver(props.place.position)} onClick={(e) => props.handleLocationClick(props.place.position)}>
            <h4>{props.place.position.placeName}</h4>
            <img className="img-responsive img-location" src={props.place.position.placePhoto} alt={props.place.position.placeName}/>
        </li>
    );


export default PlaceComponent;