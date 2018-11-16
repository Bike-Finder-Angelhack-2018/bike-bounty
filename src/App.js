import React, { Component } from 'react';
import Map from './Map';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Bike Finder</h1>
        <h3>Find a lost or damaged bike, and return it to a nearby docking station for payment.</h3>
        <Map></Map>
      </div>
    );
  }
}

export default App;
