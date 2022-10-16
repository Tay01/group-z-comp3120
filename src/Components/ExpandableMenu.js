import React from 'react'
import { state, useState } from 'react'

export default function ExpandableMenu(props) {
    const [open, setOpen] = useState(false);


  return (
    <div className="expandableMenu" id={props.id==undefined?"":props.id}>
        <a href="#" className="menuIconButton" onClick={() => setOpen(!open)}>
            {props.visualComponent == undefined ? <div className="defaultMenuVisual">{props.text}</div> : props.visualComponent}
        </a>

        {open && props.children}
    </div>
  )
}