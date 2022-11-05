import React from 'react'
import { Loader, Marker, GoogleMap, InfoWindow } from "@googlemaps/js-api-loader";
import { state, useState } from "react";
import { useEffect } from 'react';
import Globals from '../../Globals';

export default function MarkerPopup(props) {
    const [state, setState] = useState(props.bodyData)
    const [isLiked, setIsLiked] = useState(false)
    const [isDisliked, setIsDisliked] = useState(false)

    const metaData = props.metaData

    const mainContentRef = React.useRef();



    useEffect(() => {
      if(!props.isCreatorUser) {
      mainContentRef.current.setAttribute("readonly", true)
    }
    }, [])


    


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
      isLiked?setState({...state, likes: state.likes - 1}):setState({...state, likes: state.likes + 1})
      if(isLiked){
        fetch(Globals.API_BASEURL + "/markers/" + metaData.id + "/unlike", {
          method: "GET",
        })
      }else{
        fetch(Globals.API_BASEURL + "/markers/" + metaData.id + "/like", {
          method: "GET",
        })
      }
      setIsLiked(!isLiked)
    }

    function dislikesChange(e){
      isDisliked
        ? setState({ ...state, dislikes: state.dislikes - 1 })
        : setState({ ...state, dislikes: state.dislikes + 1 });
      setIsDisliked(!isDisliked)
    }



    
  return (
    <div class="MarkerPopup">
      <textarea class="MarkerPopupContent" ref={mainContentRef} defaultValue={state.mainContent} onChange={mainContentChange}>
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
        onClick={dislikesChange}
      >+</button>
      <br></br>
    </div>
  );
}
