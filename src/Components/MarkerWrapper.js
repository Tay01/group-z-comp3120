import React from "react";
import { state, useState } from "react";
import { Loader, Marker, GoogleMap, InfoWindow } from "@googlemaps/js-api-loader";
import MarkerPopup from "./MarkerPopup"
import ReactDOM from "react-dom"


class MarkerWrapper {
  constructor(pos, color, metadata, appState, onMarkerClick, id, creatorUser) {
    this.docID = id;
    this.pos = pos;
    this.color = color;
    this.appState = appState;
    this.metadata = metadata;
    this.creatorUser = creatorUser
    this.onMarkerClick = onMarkerClick;
    if (metadata == undefined) {
      console.log("metadata is undefined");
      console.log(this.creatorUser)
      //create default marker settings if none are provided
      this.metadata = {
        creatorUser: this.creatorUser,
        likes: 0,
        dislikes: 0,
        comments: [],
        mainContent: "Enter text...",
      };

      this.metadata.icon =
        "http://maps.google.com/mapfiles/ms/icons/" + color + "-dot.png";
    }
    this.DOMMarker = this.createDOMMarker();
  }
  //this object exists because though we reference a marker as one thing, it actually has two formats/states
  //1: A metadata object that can be stored in the database
  //2: A google maps marker object that is in the DOM and must be treated as such
  //to merge these two states into one object, we create a wrapper object with methods that will simplify the process of handling markers.

  createDOMMarker() {
    //this method creates a google maps marker object and returns it

    //create infowindow for the marker
    const infoWindow = new window.google.maps.InfoWindow({});
    //infowindowdiv -> content
    var infoWindowContent = document.createElement("div");
    ReactDOM.render(
      <MarkerPopup metadata={this.metadata} updatefn={(popupContent) => {this.update(this.pos, this.color, popupContent)}} infoWindow={infoWindow}/>,
      infoWindowContent
    );
    infoWindow.setContent(infoWindowContent);
    //const infoWindowMainContent = infoWindowContent.getElementsByClassName("MarkerPopupContent")[0];
    

    

    const marker = new window.google.maps.Marker({
      map: this.appState.mapObject,
      position: this.pos,
      icon: this.metadata.icon,
      infoWindow: infoWindow,
    });

    //bind event listeners
    marker.addListener("click", () => {
      this.onMarkerClick(this);
    });
    
    

    return marker;
  }

  getDOMMarker() {
    return this.DOMMarker;
  }

  setMap(map) {
    this.getDOMMarker().setMap(map);
  }

  openInfoWindow() {
    this.getDOMMarker().infoWindow.open({
      map: this.appState.mapObject,
      anchor: this.getDOMMarker(),
    });
  }

  delete() {
    this.getDOMMarker().setMap(null);
    //then do logic for db removal
  }

  async save(payload) {
    //save to db
    console.log(this.metadata);
    await fetch(
      "https://us-central1-group-z.cloudfunctions.net/app/api/markers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pos: this.pos,
          color: this.color,
          metadata: this.metadata,
        }),
      }
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.docID = data.id;
      });
  }

  update(pos,color,payload) {
    //update db
    console.log("saving to db");
    console.log(pos, color, payload)
    fetch("https://us-central1-group-z.cloudfunctions.net/app/api/markers", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.docID,
        payload: {
          pos: pos,
          color: color,
          metadata: payload,
        },
      }),
    }).then((res) => console.log(res));
  }

 
}

export default MarkerWrapper