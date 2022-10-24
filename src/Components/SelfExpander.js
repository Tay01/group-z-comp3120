import React from "react";

export default function SelfExpander(props) {
  //this is a stupid class

  return (
    <div
      className="spawnLR"
    >
      {props.children}
    </div>
  );
}
