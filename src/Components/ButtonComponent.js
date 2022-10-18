import React from 'react'
import { useState } from 'react'

export default function ButtonComponent(props) {
  const [state, setState] = useState({id: (props.id == undefined)?"":props.id, class: (props.class == undefined)? "buttoncomponent":props.class, onClick:(props.onClick == undefined)?() => {console.log("I am the default function for a buttoncomponent")}:props.onClick, text: (props.text == undefined)?"":props.text, statefulObject: props.statefulObject});

  

  //if we do not pass a visual component to the button, we will make it into an actual button component
  if(props.visualComponent == undefined){
    return (
      <button id={state.id} className={state.class} onClick={state.onClick} >{state.text}</button>
    )
  }else{
    //else, if we do have a visual component that we can use, we will display that instead.
    return (
      <div id={state.id} className={state.class} onClick={state.onClick} >{props.visualComponent}</div>
    )
  }
}
