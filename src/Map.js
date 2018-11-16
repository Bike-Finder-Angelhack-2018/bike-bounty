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
        const { isLoaded, bikes } = this.state;
        if (!isLoaded){
            return <div>Loading...</div>
        } else {
            return (
                <Map google={this.props.google} zoom={14} onClick={this.onMapClicked}>
                {bikes.map((bike)=>{
                    return <Marker onClick={this.onMarkerClick} key={bike.id} title={bike.title} name={bike.name} position={bike.position} icon={{url: 'bike.png'}}></Marker>
                })}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
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