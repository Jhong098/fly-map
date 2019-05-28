import React from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import './App.css';
import MapStyles from "./MapStyles.json";

class App extends React.Component {
  searchBox = null;
  
  render() {
    console.log(process.env.REACT_APP_GOOGLE_MAPS_API)
    return (
      <div className="App">
        <LoadScript
          id="script-loader"
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
          onError={(error) => console.log(error)}
          onLoad={() => console.log("loaded")}
          libraries={["places"]}
        >
          <GoogleMap
            id='example-map'
            mapContainerStyle={{
              height: "400px",
              width: "800px"
            }}
            zoom={7}
            center={{
              lat: -3.745,
              lng: -38.523
            }}
            options={{styles: MapStyles}}
          >
            <StandaloneSearchBox
              onLoad={ref => this.searchBox = ref}
              onPlacesChanged={
                () => console.log(this.searchBox.getPlaces())
              }
            >
              <input
                type="text"
                placeholder="Customized your placeholder"
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `240px`,
                  height: `32px`,
                  padding: `0 12px`,
                  borderRadius: `3px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `14px`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                  position: "absolute",
                  left: "50%",
                  marginLeft: "-120px"
                }}
              />
            </StandaloneSearchBox>
          </GoogleMap>
        </LoadScript>
      </div>
    );
  }

}

export default App;
