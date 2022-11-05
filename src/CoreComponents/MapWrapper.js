import React from "react";
import { useState, useEffect, shouldComponentUpdate } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Loader, Marker, GoogleMap } from "@googlemaps/js-api-loader";
import MarkerPopup from "../Components/MarkerComponents/MarkerPopup";
import MarkerWrapper from "../Components/MarkerComponents/MarkerWrapper";
import { Timestamp } from "firebase/firestore";
import Globals from "../Globals.js";


export default function MapWrapper(props) {
  console.log("MapWrapper was initialised");
  //on initialisation, we want to set our state variables for the proxyState
  const appState = props.appState;
  const eventsObject = props.eventsObject;
  const functionsObject = { //object for passing functions to markers etc. in order to assign the markerWrapper as "this"
    "onMarkerClick": (markerWrapper) => {
        //each marker should hold a reference to this "onMarkerClick" function, where pos is set on the creation of the marker.
        if (appState.mapCursorMode == "delete") {
          markerWrapper.delete();
        }
        if (appState.mapCursorMode == "default") {
          markerWrapper.openInfoWindow();
        }
  },

  }
  const username = props.user
  appState["markers"] = [];
  appState["markerPositions"] = [];



  //DO NOT TOUCH
  const loader = new Loader({
    apiKey: "AIzaSyDu_da3gQIs8G9RB9_CLdDRNyNCXUW-EJ8",
    version: "weekly",
  });

  //server methods for pushing and pulling data:

  //create a reference to the map, so we can call map methods
  const mapRef = React.createRef();

  //CUSTOM METHODS FOR MAP CONTROLS
  const setCenter = (map) => {
    map.setCenter(appState.userLocation);
    getLocation();
  };

 
  //Custom Controls for the map are created here
  function createCenterControl(map) {
    const controlButton = document.createElement("button");
    controlButton.className = "mapCustomControl";
    controlButton.textContent = "Center Map";
    controlButton.title = "Click to recenter the map";
    controlButton.type = "button";

    // Setup the click event listeners: simply set the map to current user location.
    controlButton.addEventListener("click", () => {
      setCenter(map);
    });
    return controlButton;
  }

  //Functions for use with EventListeners
  const onMapClick = (e) => {
    console.log("IM CLICKING")
    e.stop()
    e.cancelBubble = true;
    const clickPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    
    
    if (appState.mapCursorMode == "marker") {
      //if we are creating a new marker,,,
      
      //This timestamp is for TTL Policy. Should delete 30 seconds after being placed.
      //A second timestamp can be added in the future for reference.
      //30000ms will be adjusted in the future.
      const timestamp = Date.now() + 30*1000;
      console.log(timestamp);

      //all we need to provide dropMarker when creating a new marker is position and metadata
      const marker = dropMarker(
        clickPosition,
        {
          id: "unassigned",
          color: appState.markerDropType,
          creator: appState.userState.user,
          timestamp: timestamp
        },
        undefined
      );
      appState.mapCursorMode = "default";
      dispatchEvent(eventsObject.markerDropEvent);
    }
  };

  

  const dropMarker = (pos, metaData, bodyData) => {
    const marker = new MarkerWrapper(pos, metaData, bodyData, eventsObject, functionsObject, appState.mapObject);
    appState["markers"].push(marker);
    return marker;
  };

  const trackLocation = (successCB = () => {}, failureCB = () => {}) => {
    if (navigator.geolocation) {
      console.log(" I CAN SEE YOU ")
      return navigator.geolocation.watchPosition(successCB, failureCB);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const getLocation = (successCB = () => {}, failureCB = () => {}) => {
    console.log("gl call");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (successPosition) => {
          console.log("success call");
          appState["userLocation"] = {
            lat: successPosition.coords.latitude,
            lng: successPosition.coords.longitude,
          };
          successCB();
        },
        (errorPosition) => {
          console.log(errorPosition);
          failureCB();
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  function filterMarkersRange(){
    getMarkersFromServer().then(
      () => {
        appState.markers.forEach((marker) => {
          if (marker.distanceFromUser > appState.markerRange) {
            console.log("do Something")
          }
        });
      }
    )
    
  }

  function filterMarkers() {
    getMarkersFromServer().then(
    appState.markers.forEach((marker) => {
      if (!appState["markerViewType"][marker.color]) {
        marker.setMap(null);
      } else {
        marker.setMap(appState.mapObject);
      }
    }))
    console.log(appState.markers);
    
  }

  async function getMarkersFromServer(){
    fetch(Globals.API_BASEURL + "/markers/withRange", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: appState.userState.user,
        range: appState.markerRange,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        const resultFromServer = data;
        console.log("RESULT FROM SERVER: " + resultFromServer);
        console.log(appState.markers);
        var markerIDs = appState.markers.map((marker) => marker.id);
        var newMarkers = resultFromServer.filter(
          (marker) => !markerIDs.includes(marker[1])
        );
        console.log(newMarkers);

        newMarkers.forEach((newMarker) => {
          console.log("I have a new marker");
          console.log(newMarker[0]);
          let metaData = newMarker[0].metaData;
          if (metaData.id == "unassigned") {
            metaData.id = newMarker[1];
          }
          dropMarker(
            newMarker[0].pos,
            newMarker[0].metaData,
            newMarker[0].bodyData
          );
        });
      });

  }

  async function getMarkersAndDelete() {
    appState.markers.forEach((cm) => {
      cm.delete()
    })
    appState.markers = [];
    // appState.markers.forEach((currentMarker) => {
      
    //   let isReal = currentMarker.pullUpdate();
    //   if (!isReal) {
    //     currentMarker.delete();
    //     appState.markers.remove(currentMarker)
    //     console.log(appState)

    //   }
      
    // })

      
    fetch(Globals.API_BASEURL+"/markers/withRange", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: appState.userState.user,
        range: appState.markerRange,
    })})
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        const resultFromServer = data;
        console.log("RESULT FROM SERVER: " + resultFromServer);
        console.log(appState.markers)
        var markerIDs = appState.markers.map((marker) => marker.id)
        console.log(markerIDs)
        var newMarkers = resultFromServer.filter((marker) => !markerIDs.includes(marker[1]))
        console.log(newMarkers)

        newMarkers.forEach((newMarker) => {
          console.log("I have a new marker")
          console.log(newMarker[0])
          let metaData = newMarker[0].metaData
          if(metaData.id == "unassigned"){
            metaData.id = newMarker[1]
          }
          dropMarker(newMarker[0].pos, newMarker[0].metaData, newMarker[0].bodyData);
        });
      });
  }

  loader.load().then(() => {
    //define map
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 18,
      disableDefaultUI: true,
    });
    //define the user marker
    const userMarker = new window.google.maps.Marker({
      position: { lat: -34.397, lng: 150.644 },
      map: map,
      icon: "http://maps.google.com/mapfiles/ms/micons/man.png",
    });

    //AFTER MAPLOAD -> BIND EVENT LISTENERS
    map.addListener("click", onMapClick);
    window.addEventListener("filterEvent", filterMarkers);
    window.addEventListener("markerRangeChangedEvent", getMarkersFromServer);
    window.addEventListener("markerRangeChangedEvent", filterMarkersRange);
    window.setInterval(getMarkersFromServer, 10000);

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
    appState["mapObject"] = map;
    getLocation((location) => {
      map.setCenter(appState.userLocation);
    });
    trackLocation(
      (pos) => {
        console.log(pos);
        userMarker.setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        appState.userLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
      },
      (err) => {
        console.log(err);
      }
    );
    getMarkersFromServer();
  });

  //On initialisation, we want to get the user's location to allow the smooth centreing of the map. Then, whenenver we click center we can buffer the nnext location call to give an illusion of smooth movement until we devevlop some livve updating stuff
  getLocation();

  return <div ref={mapRef} id="mapWrapper"></div>;
}
