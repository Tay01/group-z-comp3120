import React from "react";
import { state, useState } from "react";

export default function SelfExpandableMenu(props) {

  
  

  if(props.menuState.selectMarkerControl == "open"){
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
      <div className="menuIconButton" onClick={props.openFn}>
        {props.visualComponent == undefined ? (
          <div className="selfExpandClosed">{props.text}</div>
        ) : (
          <div className="selfExpandClosed">{props.visualComponent}</div>
        )}
        <span></span>
      </div>

      {props.menuState == "open" && props.children}
    </div>
  );
        }
}
