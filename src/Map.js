import React from 'react';
import './App.css';
import mapboxgl from "mapbox-gl/dist/mapbox-gl";
import maxBoxGeocoder from "@mapbox/mapbox-gl-geocoder";

class Map extends React.Component {
  searchBox = null;
  map = null;

  componentDidMount() {
    console.log(process.env.REACT_APP_MAPBOX_API)
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;
    this.map = new mapboxgl.Map({
        container: 'mapbox',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 10,
        center: [-80.5416618, 43.4728746]
    });
    const geocoder = new maxBoxGeocoder({
        accessToken: mapboxgl.accessToken,
        types: "country, region, place",
        flyTo: {
            bearing: 90,
            zoom: 10,
            pitch: 40,
            curve: 1.5,
            speed: 2,
        },
        minLength: 5,
        
    });
    document.getElementById('geocoder').appendChild(geocoder.onAdd(this.map));
  }

  render() {
    return (
        <div>
            <div id="mapbox" style={{ height: "500px", width: "100%" }} />
            <div id="geocoder" />
        </div>
    );
  }

}

export default Map;
