import React from 'react';

const PlaceComponent = (props) => (
        <li className="col-md-3" onClick={(e) => props.handleLocationClick(props.place.position)}>
            <h2>{props.place.position.placeName}</h2>
            <img className="img-circle img-responsive" src={props.place.position.placePhoto} alt={props.place.position.placeName}/>
        </li>
    );


export default PlaceComponent;