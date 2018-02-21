import React from 'react';

const PlaceDataComponent = (props) => (
        <li className="col-md-12" >
            <h4>{props.placeData.card.title}</h4>
            <img className="img-responsive img-data" src={props.placeData.card.src} alt={props.placeData.card.title}/>
            <p className="destination-info">{props.placeData.card.narrative_text.replace(/<[^>]+>/g, '')}</p>
        </li>
    );


export default PlaceDataComponent;