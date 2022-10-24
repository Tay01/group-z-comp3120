import React from 'react';

function Marker(props) {
    var markerVisualColor = "#fff"
    if(props != undefined){
        if(props.color != undefined){
            markerVisualColor = props.color
        }
    }
   
    



    return (
      <div className="markerVisualBG" style={{ backgroundColor: "rgba(0,0,0,0.65)" }}>
        <div className="markerVisual" style={{color: markerVisualColor, borderColor: markerVisualColor}}>
        </div>
      </div>
    );

}

export default Marker;