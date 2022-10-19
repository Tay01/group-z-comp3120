import React from 'react'
import { Loader, Marker, GoogleMap, InfoWindow } from "@googlemaps/js-api-loader";
import { state, useState } from "react";

export default function MarkerPopup(props) {
    const [state, setState] = useState({"likes": 0, "dislikes": 0, "comments": [], content: props.content})
  return (
    <div>I am the default Marker Popup! <br></br>
    {state.likes} Likes <br></br>
    {state.dislikes} Dislikes <br></br>
    </div>
  )
}
