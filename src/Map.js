import React, { useEffect, useState } from 'react';
import mapboxgl from "mapbox-gl/dist/mapbox-gl";
import maxBoxGeocoder from "@mapbox/mapbox-gl-geocoder";

const Map = () => {
  const defaultParams = {
    bearing: 0,
    zoom: 10,
    pitch: 40,
    curve: 1.5,
    speed: 2
  };
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;
  const [animParams, setAnimParams] = useState(defaultParams);
  const { bearing, zoom, pitch, curve, speed } = animParams;
  
  const bearingRef = React.useRef();
  const zoomRef = React.useRef();
  const pitchRef = React.useRef();
  const curveRef = React.useRef();
  const speedRef = React.useRef();

  const map = React.useRef();

  useEffect(() => {
    console.log('initialized map');
    map.current = new mapboxgl.Map({
      container: 'mapbox',
      style: process.env.REACT_APP_MAPBOX_STYLE,
      zoom: 10,
      center: [-80.5416618, 43.4728746]
    });
  }, []);

  useEffect(() => {
    console.log("changed geocoder params");
    if (map.current) {
      const geocoder = new maxBoxGeocoder({
        accessToken: mapboxgl.accessToken,
        types: "country, region, place",
        flyTo: animParams
      });
      const currChild = document.getElementById('geocoder').childNodes[0];
      if (currChild) {
        document.getElementById('geocoder').replaceChild(geocoder.onAdd(map.current), currChild);
      } else {
        document.getElementById('geocoder').appendChild(geocoder.onAdd(map.current));
      }
    }
  }, [animParams]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(zoomRef.current.value);
    setAnimParams({
      bearing: bearingRef.current.value,
      zoom: zoomRef.current.value,
      pitch: pitchRef.current.value,
      curve: curveRef.current.value,
      speed: speedRef.current.value
    });
  };

  return (
    <div>
      <div id="mapbox" style={{ height: "500px", width: "100%" }} />
      <div id="geocoder" />
      <p>Map Animation Params</p>
      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", width: "200px" }}>
        <label>
          bearing: 
          <input type="text" defaultValue={bearing} ref={bearingRef} />
        </label>
        <label>
          zoom: 
          <input type="text" defaultValue={zoom} ref={zoomRef} />
        </label>
        <label>
          pitch: 
          <input type="text" defaultValue={pitch} ref={pitchRef} />
        </label>
        <label>
          curve: 
          <input type="text" defaultValue={curve} ref={curveRef} />
        </label>
        <label>
          speed: 
          <input type="text" defaultValue={speed} ref={speedRef} />
        </label>
        <input type="submit" value="Apply" />
      </form>
    </div>
  );
};

export default Map;
