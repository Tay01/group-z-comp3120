import React from "react";
import { state, useState } from "react";
import { Loader, Marker, GoogleMap, InfoWindow } from "@googlemaps/js-api-loader";


class MarkerWrapper {
  constructor(pos, color, metadata, appState, onMarkerClick, id) {
    this.docID = id;
    this.pos = pos;
    this.color = color;
    this.appState = appState;
    this.metadata = metadata;
    this.onMarkerClick = onMarkerClick;
    if (metadata == undefined) {
      //create default marker settings if none are provided
      this.metadata = {
        likes: 0,
        dislikes: 0,
        comments: [],
        //  "markerContent": this.metadata.markerContent==undefined?"I am a default marker!":this.metadata.markerContent,
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
    //make a div for the info window
    var infoWindowDiv = document.createElement("div");
    infoWindowDiv.className = "infoWindowDiv";

    //infowindowdiv -> username
    var infoWindowUsernameSection = document.createElement("div");
    infoWindowUsernameSection.className = "infoWindowUsername";

    //infowindowdiv -> likes
    var infoWind;

    //infowindowdiv -> content
    var infoWindowContent = document.createElement("div");
    infoWindowContent.contentEditable = true;
    infoWindowContent.oninput = (e) => {
      this.infoWindowContentChange(e);
    };
    infoWindowContent.innerHTML = this.metadata.markerContent;
    infoWindow.setContent(infoWindowContent);

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
    
    infoWindow.addListener("closeclick", () => {
      this.update();
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

  async save() {
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

  update() {
    //update db
    console.log("saving to db");
    fetch("https://us-central1-group-z.cloudfunctions.net/app/api/markers", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.docID,
        payload: {
          pos: this.pos,
          color: this.color,
          metadata: this.metadata,
        },
      }),
    }).then((res) => console.log(res));
  }

  editMarkerContent(newContent) {
    //edit infowindow content
    this.metadata.markerContent = newContent;
  }

  infoWindowContentChange(e) {
    console.log(e);
    this.editMarkerContent(e.target.innerText);
  }
}

export default MarkerWrapper