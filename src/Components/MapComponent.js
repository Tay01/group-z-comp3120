import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";


export default function MapComponent(props) {
    
  const { isLoaded, isNotLoaded } = useLoadScript({
    googleMapsApiKey:"AIzaSyDu_da3gQIs8G9RB9_CLdDRNyNCXUW-EJ8",
  });

  const mapStyles = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#ebe3cd",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#523735",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f1e6",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#c9b2a6",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#dcd2be",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#ae9e90",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#93817c",
        },
      ],
    },
    {
      featureType: "poi.business",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#a5b076",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#447530",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f1e6",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#fdfcf8",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#f8c967",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#e9bc62",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#e98d58",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#db8555",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#806b63",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8f7d77",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ebe3cd",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#b9d3c2",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#92998d",
        },
      ],
    },
  ];

  props.appState["mapCursorMode"] = "default";
  

  const [state, setState] = useState({ position: undefined, markers: [] });

  //event listeners
    const onMapClick = (e) => {
        const position = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        };
        console.log(e)
        console.log(position)
        console.log(props.appState.mapCursorMode)
        if(props.appState.mapCursorMode == "marker"){
            dropMarker(position);
        }
        
    }

    const onMarkerClick = (marker) => {
        if(props.appState.mapCursorMode == "delete"){
            deleteMarker(marker);
        }
    }

    

  const dropMarker = (pos) => {
    console.log("dropmarker fn")
    setState({...state, markers:[...state.markers, pos] });
    };

  const deleteMarker = (pos) => {
    setState({...state, markers: state.markers.filter((marker) => marker !== pos)});
  }


  const initMapObject = () => {
  }

  const getLocation = () => {
    console.log("gl call")
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (successPosition) => {
            console.log("success call")
          setState({
            ...state,
            position: {
              lat: successPosition.coords.latitude,
              lng: successPosition.coords.longitude,
            },
          })
          initMapObject();
        },
        (errorPosition) => {
          console.log(errorPosition);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  
  

  console.log(isLoaded)

  

  if (!isLoaded || state.position == undefined) {
    getLocation();
    return <div id="mapcomponent">loading...</div>;
  }
 
  if (isLoaded && state.position != undefined) {
    return (
      <div id="mapcomponent">
        <GoogleMap
          zoom={15}
          center={state.position}
          mapContainerClassName="mapcontainer"
          mapId={"99308a9fa065e968"}
          id="googlemap"
          onClick={onMapClick}
        >
            {state.markers.map((marker, index) => (
                <Marker key={index} position={marker} onClick={() => {onMarkerClick(marker)}}/>
            ))}
        </GoogleMap>
      </div>
    );
  }

  console.log(state);


}
