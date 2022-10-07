import React from 'react'
import { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Loader } from '@googlemaps/js-api-loader';


export default function MapWrapper() {
    const [state, setState] = useState({})

    const loader = new Loader({
        apiKey: "AIzaSyDu_da3gQIs8G9RB9_CLdDRNyNCXUW-EJ8",
        version: "weekly",
    });

    const mapRef = React.createRef()

    function createCenterControl(map) {
      const controlButton = document.createElement("button");

      // Set CSS for the control.
      controlButton.style.backgroundColor = "#fff";
      controlButton.style.border = "2px solid #fff";
      controlButton.style.borderRadius = "3px";
      controlButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
      controlButton.style.color = "rgb(25,25,25)";
      controlButton.style.cursor = "pointer";
      controlButton.style.fontFamily = "Roboto,Arial,sans-serif";
      controlButton.style.fontSize = "16px";
      controlButton.style.lineHeight = "38px";
      controlButton.style.margin = "8px 0 22px";
      controlButton.style.padding = "0 5px";
      controlButton.style.textAlign = "center";

      controlButton.textContent = "Center Map";
      controlButton.title = "Click to recenter the map";
      controlButton.type = "button";

      // Setup the click event listeners: simply set the map to Chicago.
      controlButton.addEventListener("click", () => {
        map.setCenter({ lat: 41.8781, lng: -87.6298 });
      });

      return controlButton;
    }

    loader.load().then(() => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
      //after map is loaded, we can bind event listeners to it
      // Create the DIV to hold the control.
      const centerControlDiv = document.createElement("div");
      // Create the control.
      const centerControl = createCenterControl(map);
      // Append the control to the DIV.
      centerControlDiv.appendChild(centerControl);

      map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(
        centerControlDiv
      );
    });

  return (
    <div ref={mapRef} id="mapcomponent"></div>
  )
}
