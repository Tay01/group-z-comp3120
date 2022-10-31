import React from 'react'
import { state, useState } from 'react'

export default function ExpandableMenu(props) {
    const [open, setOpen] = useState(false);


  return (
    <div
      className={
        props.align == undefined
          ? "expandableMenu"
          : "expandableMenu" + props.align
      }
      id={props.id == undefined ? "" : props.id}
    >
      <div className="menuIconButton" onClick={() => setOpen(!open)}>
        <div className="visualComponent">
          {props.visualComponent == undefined
            ? props.text
            : props.visualComponent}
        </div>
        <span></span>
      </div>

      {open && props.children}
    </div>
  );
}
