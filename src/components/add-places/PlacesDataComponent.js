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
             <ul className="widget__list2">
                {this.props.placeData.map((placeData, index) => {
                    return <PlaceDataComponent key={index} tabIndex={index + 1}  placeData={placeData}/>
                })}
            </ul>
        )
    }
}

export default PlacesDataComponent;