import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";


export default function MapComponent() {
    
  const { isLoaded, isNotLoaded } = useLoadScript({
    googleMapsApiKey:"AIzaSyDu_da3gQIs8G9RB9_CLdDRNyNCXUW-EJ8",
  });

  const [state, setState] = useState({ position: undefined });

  const initMapObject = () => {
  }

  const getLocation = () => {
    console.log("gl call")
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (successPosition) => {
            console.log("success call")
          setState({
            ...state,
            position: {
              lat: successPosition.coords.latitude,
              lng: successPosition.coords.longitude,
            },
          })
          initMapObject();
        },
        (errorPosition) => {
          console.log(errorPosition);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  

  console.log(isLoaded)

  if (!isLoaded || state.position == undefined) {
    getLocation();
    return <div id="mapcomponent">loading...</div>;
  }
 
  if (isLoaded && state.position != undefined) {

    return (
      <div id="mapcomponent">
        <GoogleMap
          zoom={15}
          center={state.position}
          mapContainerClassName="mapcontainer"
        ></GoogleMap>
      </div>
    );
  }

  console.log(state);


}
