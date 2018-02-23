import React, { Component } from 'react';
import PlaceDataComponent from './PlaceDataComponent';

class PlacesDataComponent extends React.Component  {
      constructor(props){
        super();
     }

     handleLocationClick = (e) => {
        console.log('e', e.target.elements);
     }

      render(){
        return(
             <ul className="widget__list">
                {this.props.placeData.map((placeData, index) => {
                    return <PlaceDataComponent key={index}  placeData={placeData}/>
                })}
            </ul>
        )
    }
}

export default PlacesDataComponent;