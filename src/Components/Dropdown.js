import React from 'react'

export default function Dropdown(props) {
    //this is a stupid class

    return(<div className={`dropdown ${props.openLeft?'dropdownLeft':''} ${props.openRight?'dropdownRight':''} ${props.openUp?'dropdownUp':''} ${props.openDown?'dropdownDown':''} ${props.openReverse?'dropdownReverse':''}`}>{props.children}</div>)
    



  
}
