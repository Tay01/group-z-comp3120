import React from "react";
import { useState, useEffect, shouldComponentUpdate } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Loader, Marker, GoogleMap } from "@googlemaps/js-api-loader";
import MarkerPopup from "./MarkerPopup";
import MarkerWrapper from "./MarkerWrapper";

export default function MapWrapper(props) {
  console.log("MapWrapper was initialised");
  //on initialisation, we want to set our state variables for the proxyState
  const appState = props.proxyState;
  const eventsObject = props.eventsObject;
  const username = props.user
  appState["markers"] = [];
  appState["markerPositions"] = [];

  //set to false if you want the map to render. Otherwise, it is just here to limit api calls
  if (false) {
    return <div id="mapWrapper" style={{ backgroundColor: "red" }}></div>;
  }

  //define the loader for the map
  const loader = new Loader({
    apiKey: "AIzaSyDu_da3gQIs8G9RB9_CLdDRNyNCXUW-EJ8",
    version: "weekly",
  });

  //server methods for pushing and pulling data:

  //create a reference to the map, so we can call map methods
  const mapRef = React.createRef();

  //define custom methods for the map
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
      //if we are creating a new marker,,,

      const marker = dropMarker(position, appState.markerDropType, undefined, undefined, username);
      marker.createRecordInDB();
      console.log("yeet");
      appState.mapCursorMode = "default";
      dispatchEvent(eventsObject.markerDropEvent);

      

    }
  };

  const onMarkerClick = (markerWrapper) => {
    //each marker should hold a reference to this "onMarkerClick" function, where pos is set on the creation of the marker.
    if (appState.mapCursorMode == "delete") {
      markerWrapper.delete();
    }
    if (appState.mapCursorMode == "default") {
      markerWrapper.openInfoWindow();
    }
  };

  const dropMarker = (pos, color, markerData=undefined, id, creatorUser) => {
    const marker = new MarkerWrapper(pos, color, markerData, appState, eventsObject, onMarkerClick, id, creatorUser);
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

  function filterMarkers() {
    console.log("filtering markers");
    console.log(appState.markers);
    appState.markers.forEach((marker) => {
      if (!appState["markerViewType"][marker.color]) {
        marker.setMap(null);
      } else {
        marker.setMap(appState.mapObject);
      }
    });
    console.log(appState.markers);
  }

  function getMarkersFromServer() {
    fetch("https://us-central1-group-z.cloudfunctions.net/app/api/markers/withRange", {
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
        console.log(resultFromServer);
        console.log(appState.markers)
        var markerIDs = appState.markers.map((marker) => marker.docID)
        console.log(markerIDs)
        var newMarkers = resultFromServer.filter((marker) => !markerIDs.includes(marker[1]))
        console.log(newMarkers)

        newMarkers.forEach((newMarker) => {
          console.log("I have a new marker")
          dropMarker(newMarker[0].pos, newMarker[0].color, newMarker[0].metadata, newMarker[1], newMarker[0].creatorUser);
        });
        filterMarkers();
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

    //after map is loaded, we can bind event listeners to it
    map.addListener("click", onMapClick);
    window.addEventListener("filterEvent", filterMarkers);
    window.addEventListener("markerRangeChangedEvent", getMarkersFromServer);

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
