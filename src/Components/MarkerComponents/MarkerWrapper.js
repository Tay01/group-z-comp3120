import React from "react";
import { state, useState } from "react";
import { Loader, Marker, GoogleMap, InfoWindow } from "@googlemaps/js-api-loader";
import MarkerPopup from "./MarkerPopup"
import ReactDOM from "react-dom"
import { createRoot } from "react-dom";
import Globals from "../../Globals";


class MarkerWrapper {
  //Marker wrapper data can be considered in two parts:
  // 1. bodyData:: the data that is dynamic, subject to change, like likes and core content.
  // 2. metaData:: the data that is static, like the color and position of the marker.
  constructor(pos, metaData, bodyData, appState, eventsObject, functionsObject, map) {
    //guess pos is technically metadata but its so important i dont think we wanna bother wrapping and unwrapping all the time
    this.pos = pos;
    //metadata must be defined, and contain the following:
    this.id = metaData.id;
    this.color = metaData.color;
    this.creator = metaData.creator;
    this.timestamp = metaData.timestamp;

    //side effects of metadata
    this.icon = "http://maps.google.com/mapfiles/ms/icons/" + this.color + "-dot.png";
    
    //bodyData is optional at instanciation, and if undefined we will define it
    if (bodyData == undefined) {
      this.bodyData = {
        likes: 0,
        dislikes: 0,
        comments: [],
        mainContent: "Enter text...",
      };
    } else {
      this.bodyData = bodyData;
    }

    //instance attributes that are not passed or sent
    this.isChanged = false;
    

    //events object must be passed in order to access events to dispatch
    this.eventsObject = eventsObject
    
    //state
    this.appState = appState;
    
    
    //functions object must be passed in order to access functions to call, and must contain at least the onMarkerClick
    this.onMarkerClick = functionsObject.onMarkerClick;

    //map must be provided in order to render onto map
    this.map = map
    
    this.DOMMarker = this.createDOMMarker();

    //also, we need to check wether this marker has already been pushed to db, or if it is new:
    if(this.id == "unassigned"){
      this.createRecordInDB();
    }
  }
  //this object exists because though we reference a marker as one thing, it actually has two formats/states
  //1: A bodyData object that can be stored in the database
  //2: A google maps marker object that is in the DOM and must be treated as such
  //to merge these two states into one object, we create a wrapper object with methods that will simplify the process of handling markers.

    //we must instanciate the DOM object that this marker will be represented by
  createDOMMarker() {
    //this method creates a google maps marker object and returns it

    this.infoWindow = new window.google.maps.InfoWindow({});
    var infoWindowContent = document.createElement("div");
    this.root = createRoot(infoWindowContent);
    

    this.infoWindow.setContent(infoWindowContent);
  
    const marker = new window.google.maps.Marker({
      map: this.map,
      position: this.pos,
      icon: this.icon,
      infoWindow: this.infoWindow,
    });

    //bind event listeners
    marker.addListener("click", () => {
      this.onMarkerClick(this);
    });

    marker.addListener("mouseover", () => {
      console.log("hover");
      window.dispatchEvent(this.eventsObject.switchFocusEvent);
      console.log("event dispatched")
      this.openInfoWindow();
    })
    this.renderRoot();
    return marker;
  }

  renderRoot(){
    this.root.render(
      <MarkerPopup
        metaData={{
          id: this.id,
          color: this.color,
          creator: this.creator,
          timestamp: this.timestamp,
        }}
        bodyData={this.bodyData}
        updatefn={(popupContent) => {
          this.localUpdate(popupContent);
        }}
        infoWindow={this.infoWindow}
        isCreatorUser={this.creator == this.appState.userState.user}
      />
    );
  }

  getDOMMarker() {
    return this.DOMMarker;
  }

  getMetaData(){
    return {
      id: this.id,
      color: this.color,
      creator: this.creator,
      timestamp: this.timestamp
    }
  }

  setMap(map) {
    this.getDOMMarker().setMap(map);
  }

  switchFocusEvent(){
    if(this.isChanged){
    this.updateRecordInDB(this.bodyData);
    this.isChanged = false;
    }
    this.closeInfoWindow();
  }

  openInfoWindow() {
    if(this.id != "unassigned"){
    this.pullUpdate().then(() => {
      this.getDOMMarker().infoWindow.open({map: this.map, anchor: this.getDOMMarker()});
      window.addEventListener("switchFocusEvent", this.switchFocusEvent.bind(this))
    })
  }else{
    this.getDOMMarker().infoWindow.open({map: this.map, anchor: this.getDOMMarker()});
    window.addEventListener("switchFocusEvent", this.switchFocusEvent.bind(this))
  }
  }

  closeInfoWindow() {
    window.removeEventListener("switchFocusEvent",this.switchFocusEvent.bind(this));
    this.getDOMMarker().infoWindow.close();
  }

  delete() {
    this.getDOMMarker().setMap(null);
    //then do logic for db removal
  }

  async createRecordInDB() {
    //save to db
    await fetch(
      "https://us-central1-group-z.cloudfunctions.net/app/api/markers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pos: this.pos,
        }),
      }
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.id = data.id;
        this.updateRecordInDB(this.bodyData)

      });
  }

  updateRecordInDB(bodyData) {
    //update db
    console.log("saving to db");
    console.log(bodyData)
    fetch("https://us-central1-group-z.cloudfunctions.net/app/api/markers", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.id,
        payload: {
          pos: this.pos,
          metaData: this.getMetaData(),
          bodyData: this.bodyData
        }
      }),
    }).then((res) => console.log(res));
  }

  localUpdate(updatedBodyData){
    this.isChanged = true;
    this.bodyData = updatedBodyData;
  }

  async pullUpdate(){
    //send this marker's id to DB, get back the latest version of the marker
    //update this marker's bodyData
   
    fetch(Globals.API_BASEURL + "/markers/" + this.id, {
      method: "GET"
    }).then((res) => {
      if(res.status == 200){
        return res.json();
      }else{
        return false
      }
      }).then((data) => {
        data==false?this.bodyData = data.bodyData:this.bodyData = this.bodyData;
        return data
      });
    
  }


 
}

export default MarkerWrapper