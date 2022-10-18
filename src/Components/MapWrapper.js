import React from 'react'
import { useState, useEffect, shouldComponentUpdate } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Loader, Marker, GoogleMap } from '@googlemaps/js-api-loader';


export default function MapWrapper(props) {
    console.log("MapWrapper was initialised")
    //on initialisation, we want to set our state variables for the proxyState
    const appState = props.proxyState;
    appState["userLocation"] = {lat: 0, lng: 0};
    appState["markers"] = [];
    appState["markerPositions"] = [];

    //set to false if you want the map to render. Otherwise, it is just here to limit api calls
    if(false){
      return(<div id="mapWrapper" style={{backgroundColor:"red"}}></div>)
    }

    //define the loader for the map
    const loader = new Loader({
        apiKey: "AIzaSyDu_da3gQIs8G9RB9_CLdDRNyNCXUW-EJ8",
        version: "weekly",
    });

    //server methods for pushing and pulling data:
    const pushMarker = (pos,markerSettings) => {
        fetch("http://localhost:5000/api/markers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({pos: pos, markerSettings: markerSettings}),
        })
        .then(res => console.log(res))
        .then(data => {
            console.log(data)
        })
    }

    //create a reference to the map, so we can call map methods
    const mapRef = React.createRef()

    //define custom methods for the map
    const setCenter = (map) => {
      map.setCenter(appState.userLocation)
      getLocation()
    }

    

 
    //Custom Controls for the map are created here
    function createCenterControl(map) {
      const controlButton = document.createElement("button");

      // Set CSS for the control. - Refactor this into the css file later by adding some ids/ classes
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

      // Setup the click event listeners: simply set the map to current user location.
      controlButton.addEventListener("click", () => {
        setCenter(map);
      });
      return controlButton;
    }

    

      


    // //event listeners for the map
    const onMapClick = (e) => {
      const position = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      console.log(e);
      console.log(position);
      console.log(appState.mapCursorMode);
      if (appState.mapCursorMode == "marker") {
        dropMarker(position,{color: appState.markerDropType});
        pushMarker(position,{color: appState.markerDropType});
        console.log("yeet")
      }
    };

    const onMarkerClick = (marker) => {
      //each marker should hold a reference to this "onMarkerClick" function, where pos is set on the creation of the marker.
      if (appState.mapCursorMode == "delete") {
        marker.setMap(null)
      }
    };

    const dropMarker = (pos,markerSettings) => {
      var opacity = 1
      if(markerSettings != undefined){
        switch(markerSettings.color){
          case "red": opacity = 1; break;
          case "green": opacity = 0.25; break;
          case "blue": opacity = 0.5; break;
      }
      }

      
      console.log(pos)
      console.log(appState.markerDropType)
      console.log(document.getElementById("mapWrapper"))
      const marker = new window.google.maps.Marker({
        position: pos,
        map: appState.mapObject,
        opacity: opacity,
      });
      marker.addListener("click", () => {onMarkerClick(marker)})
      appState["markers"].push({
        markerPos: pos,
        markerObject: marker,
        markerSettings: markerSettings,
      });
    };



    const getLocation = (successCB = () => {}, failureCB = () => {}) => {
      console.log("gl call");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (successPosition) => {
            console.log("success call");
            appState["userLocation"] = ({
              lat: successPosition.coords.latitude,
              lng: successPosition.coords.longitude,
            });
            successCB()

            
          },
          (errorPosition) => {
            console.log(errorPosition);
            failureCB()
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    function filterMarkers(){
      console.log("filtering markers")
      console.log(appState.markers)
      appState.markers.forEach((marker) => {
        if (marker["markerSettings"] != undefined && !appState["markerViewType"][marker["markerSettings"].color]){
          marker.markerObject.setMap(null)
        }else{
          marker.markerObject.setMap(appState.mapObject)
        }
      })
      console.log(appState.markers)

    }

    

    
    function getMarkersFromServer(){
      fetch("http://localhost:5000/api/markers").then(
        (res) => res.json()).then(
          (data) => {
          const resultFromServer = data;
          console.log(data)
          var newMarkers = resultFromServer.filter(
            (e) =>
              !appState.markers
                .map((marker) => {
                  return marker.markerPos;
                })
                .includes(e)
          );
          newMarkers.forEach((newMarker) => {
            dropMarker(newMarker.pos,newMarker.markerSettings);
          });
          filterMarkers();
          
        }
      )
      
    }
  
  

    loader.load().then(() => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 18,
        disableDefaultUI: true,
      });
      //after map is loaded, we can bind event listeners to it
      map.addListener("click", onMapClick);
      window.addEventListener("filterEvent", filterMarkers);
      
      // Create the DIV to hold the control.
      const centerControlDiv = document.createElement("div");
      // Create the control.
      const centerControl = createCenterControl(map);
      // Append the control to the DIV.
      centerControlDiv.appendChild(centerControl);

      map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(
        centerControlDiv
      );

      //give a reference to our application to call map methods
      appState["mapObject"] = map
      getLocation((location) => {map.setCenter(appState.userLocation)})
      getMarkersFromServer()
    });

  //On initialisation, we want to get the user's location to allow the smooth centreing of the map. Then, whenenver we click center we can buffer the nnext location call to give an illusion of smooth movement until we devevlop some livve updating stuff
    getLocation()

  return (
    <div ref={mapRef} id="mapWrapper"></div>
  )

  
}
