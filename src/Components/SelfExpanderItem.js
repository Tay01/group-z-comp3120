import React from "react";

export default function SelfExpanderItem(props) {
  return (
    <a href="#" className="selfExpanderItem">
      <span className="iconButton">{props.leftIcon}</span>
      {props.children}
      <span className="iconButton">{props.rightIcon}</span>
    </a>
  );
}
