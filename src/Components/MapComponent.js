import React from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import dotenv from 'dotenv';
import { useState } from 'react';

export default function MapComponent() {
    const { isMapLoaded } = useLoadScript({
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    });

    const [state, setState] = useState({position:undefined})

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (successPosition) => {
                    setState({...state, position:
                        {
                        lat: successPosition.coords.latitude,
                        lng: successPosition.coords.longitude
                        }
                    })
                },
                (errorPosition) => {
                    console.log(errorPosition)
                }
            )
        } else {alert("Geolocation is not supported by this browser.")}
    }
    if(!isMapLoaded || state.position == undefined){return <div>Loading...</div> }
    if(isMapLoaded && state.position != undefined) { }

    

  return (
    <div>MapComponent</div>
  )
}
