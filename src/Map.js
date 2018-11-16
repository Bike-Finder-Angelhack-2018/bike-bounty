import React, { Component } from 'react';

import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';


const lambda_key = process.env.REACT_APP_AWS_LAMBDA_API_KEY;

export class MapContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            bikes: [],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            docks: [],
        };
    }
    componentDidMount = ()=>{
        let myHeaders = new Headers();
        let self = this;
        myHeaders.append('x-api-key', lambda_key);
        fetch('https://dauyyicmya.execute-api.us-east-1.amazonaws.com/default/getLostLimeBikes', {
            headers: myHeaders,
        })
        .then((res)=>{
            return res.json();
        })
        .then(function(res){
            let bikes = JSON.parse(res.body);
            self.setState({bikes, isLoaded: true});
        })
        .catch((err)=>{
            console.log('err', err);
        });
        fetch(`https://api.coord.co/v1/sv/location?latitude=37.778529&longitude=-122.40564&radius_km=0.45&access_key=${process.env.REACT_APP_COORD_API_KEY}`)
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            self.setState({docks: res.features})
        });

    }
    onMarkerClick = (props, marker, e)=>{
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }
    onMapClicked = (props)=>{
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }
    render() {
        const { isLoaded, bikes, docks } = this.state;
        if (!isLoaded){
            return <div>Loading...</div>
        } else {
            return (
                <Map 
                    google={this.props.google} 
                    zoom={16} 
                    onClick={this.onMapClicked} 
                    initialCenter={{
                        lat: 37.778529,
                        lng: -122.40564
                    }}
                >
                {bikes.map((bike)=>{
                        return (
                        <Marker 
                            onClick={this.onMarkerClick} 
                            key={bike.id} 
                            title={`bike_${bike.id}`} 
                            name={`bike_${bike.id}`} 
                            status={bike.status} 
                            position={bike.position} 
                            icon={{url: 'bike.png'}}>
                        </Marker>
                        )
                })}
                {docks.map((dock) => {
                    return (
                        <Marker
                            onClick={this.onMarkerClick}
                            key={dock.id}
                            title={dock.id}
                            name={dock.id}
                            status={dock.properties.name}
                            position={{lat: dock.geometry.coordinates[1], lng: dock.geometry.coordinates[0]}}>
                        </Marker>
                    )
                })}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                        <h3>{this.state.selectedPlace.status}</h3>
                    </div>
                </InfoWindow>
                </Map>
            );
        }
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_MAP_API_KEY)
})(MapContainer)