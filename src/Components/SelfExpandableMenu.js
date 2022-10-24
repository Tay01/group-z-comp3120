import React from "react";
import { state, useState } from "react";

export default function SelfExpandableMenu(props) {
  const [open, setOpen] = useState(false);

  if(open){
    return (
      <div className="selfExpandableMenu" id={props.id==undefined?"":props.id}>
        
          {props.visualComponent == undefined ? (
            <div className="defaultMenuVisual">{props.text}</div>
          ) : (
            <div className="selfExpandOpen">{props.children}</div>
          )}
          <span></span>
        
      </div>
    );
  }
  else{
  return (
    <div className="selfExpandableMenu" id={props.id == undefined ? "" : props.id}>
      <div className="menuIconButton" onClick={() => setOpen(!open)}>
        {props.visualComponent == undefined ? (
          <div className="selfExpandClosed">{props.text}</div>
        ) : (
          <div className="selfExpandClosed">{props.visualComponent}</div>
        )}
        <span></span>
      </div>

      {open && props.children}
    </div>
  );
        }
}
