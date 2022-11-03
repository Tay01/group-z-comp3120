import React from 'react'
import { Loader, Marker, GoogleMap, InfoWindow } from "@googlemaps/js-api-loader";
import { state, useState } from "react";
import { useEffect } from 'react';

export default function MarkerPopup(props) {
    const [state, setState] = useState(props.bodyData)

    const metaData = props.metaData

    


    if(props.infoWindow != undefined){
      props.infoWindow.addListener("closeclick",() => {
        props.updatefn(state)
        console.log(state)
      })
      
    }



    function mainContentChange(e){
      setState({...state, mainContent: e.target.value})
      console.log(state)
      props.updatefn(state)
    }

    function likesChange(e){
      setState({...state, likes: state.likes+=1})
      props.updatefn(state);
    }

    function dislikesChange(e){
      setState({...state, dislikes: state.dislikes+=1})
      props.updatefn(state);
    }



    
  return (
    <div class="MarkerPopup">
      <textarea class="MarkerPopupContent" defaultValue={state.mainContent} onChange={mainContentChange}>
      </textarea>
      <br></br>
      <div class="MarkerPopupCreatorData">Created by: {metaData.creator}</div>
      {state.likes} Likes
      <button
        onClick={likesChange}
      >+</button>
      <br></br>
      {state.dislikes} Dislikes
      <button
        onClick={() => {
          setState({...state, dislikesChange});
        }}
      >+</button>
      <br></br>
    </div>
  );
}
