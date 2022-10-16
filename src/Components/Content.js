import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../logo.svg";
import "../App.css";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import LoginButton from "./LoginButton.js";
import LogoutButton from "./LogoutButton.js";
import Profile from "./Profile.js";
import MapComponent from "./MapComponent.js";
import ButtonComponent from "./ButtonComponent.js";
import Dropdown from "./Dropdown";
import StateWrapper from "../StateWrapper.js";
import MapWrapper from "./MapWrapper.js";
import { setState, useState } from "react";
import App from "../App.js"

const Content = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated){
    return (
      <>
      {/* //add all pre auth content here  */}
      <LoginButton />
      </>
    )
  }
  else {

  return (
    isAuthenticated && (
      <> 
      {/* // add all post auth content here  */}
      <h1> You are in </h1>
      <LogoutButton />

      </>
    )
  );
}
};

export default Content;