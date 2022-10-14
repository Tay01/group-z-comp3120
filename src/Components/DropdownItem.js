import React from 'react'

export default function DropdownItem(props) {
  return (
    <a href="#" className="dropdownItem">
        <span className="iconButton">{props.leftIcon}</span>
        {props.children}
        <span className="iconButton">{props.rightIcon}</span>
    </a>
  )
}
