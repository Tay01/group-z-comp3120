import React from 'react'
import { useState } from 'react'

export default function ButtonComponent(props) {
  const [state, setState] = useState({id: (props.id == undefined)?"":props.id, class: (props.class == undefined)? "buttoncomponent":props.class, onClick:(props.onClick == undefined)?() => {console.log("I am the default function for a buttoncomponent")}:props.onClick, text: (props.text == undefined)?"":props.text});

  

  

  return (
    <button id={state.id} className={state.class} onClick={state.onClick} >{state.text}</button>
  )
}
