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
      style={{backgroundColor:open?"var(--menuColor)":"transparent"}}
    >
      
        <div className="visualComponent" onClick={() => {
          if(open){
            props.propRef.current.classList.remove("expandableMenuOpenClass")
          }else{
            props.propRef.current.classList.add("expandableMenuOpenClass");
          }
          setOpen(!open)
          
          }
          }>
          {
          (props.visualComponent == undefined)?(props.text):(props.visualComponent)
          }
      </div>

      {open && props.children}
    </div>
  );
}
