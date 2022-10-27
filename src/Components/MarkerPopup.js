import React from 'react'
import { Loader, Marker, GoogleMap, InfoWindow } from "@googlemaps/js-api-loader";
import { state, useState } from "react";

export default function MarkerPopup(props) {
    const [state, setState] = useState(props.metadata)

    if(props.infoWindow != undefined){
      props.infoWindow.addListener("closeclick",() => {
        props.updatefn(state)
        console.log(state)
      })
    }

    function mainContentChange(e){
      setState({...state, mainContent: e.target.value})
      console.log(state)
    }



    
  return (
    <div class="MarkerPopup">
      <input type="textarea" class="MarkerPopupContent" defaultValue={state.mainContent} onChange={mainContentChange}>
      </input>
      <br></br>
      <div class="MarkerPopupCreatorData">{state.creatorUser}</div>
      {state.likes} Likes
      <button
        onClick={() => {
          setState({ ...state, likes: (state.likes += 1) });
        }}
      >+</button>
      <br></br>
      {state.dislikes} Dislikes
      <button
        onClick={() => {
          setState({ ...state, likes: (state.dislikes += 1) });
        }}
      >+</button>
      <br></br>
    </div>
  );
}
