import React, { Component } from 'react';

import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const marker_array = [
    {
        title: 'The marker`s title will appear as a tooltip.',
        name: 'SOMA' ,
        position:{ lat: 37.778529, lng: -122.405640 }
    },
    {
        title: 'The marker`s title will appear as a tooltip.',
        name: 'SOMA',
        position: { lat: 37.778419, lng: -122.405640 }
    },
    {
        title: 'The marker`s title will appear as a tooltip.',
        name: 'SOMA',
        position: { lat: 37.778639, lng: -122.405640 }
    },
];
const markers = marker_array.map((marker)=>{
    return <Marker title={marker.title} name={marker.name} position={marker.position}></Marker>
});

export class MapContainer extends Component {
    render() {
        return (
            <Map google={this.props.google} zoom={14}>
            {markers}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_MAP_API_KEY)
})(MapContainer)