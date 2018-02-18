import React, { Component } from 'react';
import PlaceComponent from './PlaceComponent';

class PlacesComponent extends React.Component  {
      constructor(props){
        super();
     }

     handleLocationClick = (e) => {
        console.log('e', e.target.elements);
     }

      render(){
        return(
             <ul className="widget__list">
                {this.props.markers.map((place, index) => {
                    return <PlaceComponent key={index}  place={place} handleLocationClick={this.props.handleLocationClick}/>
                })}
            </ul>
        )
    }
}

export default PlacesComponent;