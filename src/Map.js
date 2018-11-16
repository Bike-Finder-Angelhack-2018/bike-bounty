import React, { Component } from 'react';

import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';


const lambda_key = process.env.REACT_APP_AWS_LAMBDA_API_KEY;

export class MapContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            bikes: [],
        };
    }
    componentDidMount(){
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
    render() {
        const { isLoaded, bikes } = this.state;
        if (!isLoaded){
            return <div>Loading...</div>
        } else {
            return (
                <Map google={this.props.google} zoom={14}>
                {bikes.map((bike)=>{
                    return <Marker key={bike.id} title={bike.title} name={bike.name} position={bike.position} icon={{url: 'bike.png'}}></Marker>
                })}
                </Map>
            );
        }
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_MAP_API_KEY)
})(MapContainer)