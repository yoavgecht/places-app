import React from 'react';
import PlaceComponent from './PlaceComponent';

const PlacesComponent = (props) => (
    <ul className="widget__list">
        {props.markers.map((place, index) => {
            return <PlaceComponent key={index} count={index + 1} />
        })}
    </ul>
        
    );

export default PlacesComponent;