import React from 'react'
import { useState, useEffect, shouldComponentUpdate } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Loader, Marker, GoogleMap } from '@googlemaps/js-api-loader';
import MarkerPopup from './MarkerPopup';


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
    

    //create a reference to the map, so we can call map methods
    const mapRef = React.createRef()

    //define custom methods for the map
    const setCenter = (map) => {
      map.setCenter(appState.userLocation)
      getLocation()
    }

    class markerWrapper{
      constructor(pos, color, metadata){
        this.docID = "default"
        this.pos = pos
        this.color = color
        this.metadata = metadata
        if(metadata == undefined){
          //create default marker settings if none are provided
          this.metadata = {
            "likes": 0,
            "dislikes": 0,
            "comments": [],
            //  "markerContent": this.metadata.markerContent==undefined?"I am a default marker!":this.metadata.markerContent,
          }

          this.metadata.icon = "http://maps.google.com/mapfiles/ms/icons/" + color + "-dot.png"
        }
        this.DOMMarker = this.createDOMMarker();
      }
      //this object exists because though we reference a marker as one thing, it actually has two formats/states
      //1: A metadata object that can be stored in the database
      //2: A google maps marker object that is in the DOM and must be treated as such
      //to merge these two states into one object, we create a wrapper object with methods that will simplify the process of handling markers.
      
      
      createDOMMarker(){
        //this method creates a google maps marker object and returns it

        //create infowindow for the marker
        const infoWindow = new window.google.maps.InfoWindow({})
        var infoWindowContent = document.createElement("div")
        infoWindowContent.contentEditable = true
        infoWindowContent.oninput = (e) => {this.infoWindowContentChange(e)}
        infoWindowContent.innerHTML = this.metadata.markerContent
        infoWindow.setContent(infoWindowContent)

        const marker = new window.google.maps.Marker({
          map: appState.mapObject,
          position: this.pos,
          icon: this.metadata.icon,
          infoWindow: infoWindow,
        })

        //bind event listeners
        marker.addListener("click", () => {onMarkerClick(this)})
        infoWindow.addListener("closeclick", () => {this.update()})

        return marker
      }

      getDOMMarker(){
        return this.DOMMarker
      }

      setMap(map){
        this.getDOMMarker().setMap(map)
      }

      openInfoWindow(){
        this.getDOMMarker().infoWindow.open({map: appState.mapObject, anchor: this.getDOMMarker()})
      }

      delete(){
        this.getDOMMarker().setMap(null)
        //then do logic for db removal
      }

      save(){
        //save to db
          console.log(this.metadata);
          fetch("http://localhost:5001/group-z/us-central1/app/api/markers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ pos: this.pos, color: this.color, metadata: this.metadata }),
          })
            .then((res) => {
              res.json()
            }).then((data) => {
              console.log(data)
              this.docID = data.id
            });
      }

      update(){
        //update db
        console.log("saving to db")
        fetch("/api/markers", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ "id": this.docID, "payload": { pos: this.pos, color: this.color, metadata: this.metadata } } ),
        }).then(
          (res) => console.log(res)
        )
          
      }

      editMarkerContent(newContent){
        //edit infowindow content
        this.metadata.markerContent = newContent;


      }

      infoWindowContentChange(e){
        console.log(e)
        this.editMarkerContent(e.target.innerText)
      }

     



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
        //if we are creating a new marker,,,

        const marker = dropMarker(position, appState.markerDropType);
        marker.save();
        console.log("yeet")
      }
    };

    const onMarkerClick = (markerWrapper) => {
      //each marker should hold a reference to this "onMarkerClick" function, where pos is set on the creation of the marker.
      if (appState.mapCursorMode == "delete") {
        markerWrapper.delete()
      }
      if(appState.mapCursorMode == "default"){
        markerWrapper.openInfoWindow()
      }
    };

    const dropMarker = (pos,color,markerSettings) => {
      const marker = new markerWrapper(pos, color, markerSettings);
      appState["markers"].push(marker);
      return marker;
    };


    const trackLocation = (successCB = () => {}, failureCB = () => {}) => {
      if (navigator.geolocation) {
        return navigator.geolocation.watchPosition(successCB,failureCB)
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }



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
        if (!appState["markerViewType"][marker.color]){
          marker.setMap(null)
        }else{
          marker.setMap(appState.mapObject)
        }
      })
      console.log(appState.markers)

    }

    

    
    function getMarkersFromServer(){
      fetch("/api/markers")
      .then((res) => {
        console.log(res)
        return res.json()
      })
      .then((data) => {
        const resultFromServer = data;
        console.log(data)
        var newMarkers = resultFromServer.filter((e) =>
          !appState.markers
          .map((marker) => {
            return marker.markerPos;
          })
          .includes(e)
        );

        newMarkers.forEach((newMarker) => {
          dropMarker(newMarker.pos,newMarker.color,newMarker.metadata);
        });
          filterMarkers();
          
      }
    )
      
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
      trackLocation((pos) => {console.log(pos); userMarker.setPosition({"lat": pos.coords.latitude, "lng": pos.coords.longitude}); appState.userLocation = {"lat": pos.coords.latitude, "lng": pos.coords.longitude}},(err) => {console.log(err)})
      getMarkersFromServer()
    });

  //On initialisation, we want to get the user's location to allow the smooth centreing of the map. Then, whenenver we click center we can buffer the nnext location call to give an illusion of smooth movement until we devevlop some livve updating stuff
    getLocation()


  return (
    <div ref={mapRef} id="mapWrapper"></div>
  )

  
}
