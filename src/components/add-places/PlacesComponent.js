import React, { Component } from 'react';
import PlaceComponent from './PlaceComponent';

class PlacesComponent extends React.Component  {
      constructor(props){
        super();
     }

   
      render(){
        return(
             <ul className="widget__list">
                {this.props.markers.map((place, index) => {
                    return <PlaceComponent key={index} place={place} handleLocationMouseOver={this.props.handleLocationMouseOver}  handleLocationClick={this.props.handleLocationClick}/>
                })}
            </ul>
        )
    }
}

export default PlacesComponent;