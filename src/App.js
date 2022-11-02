//Styles
import logo from "./logo.svg";
import Typewriter from 'typewriter-effect';
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import React, { useEffect } from "react";
import Canvas from './Components/Canvas'

//React
import { setState, useState } from "react";

//????
//Components - app level
import LoginButton from "./Components/LoginButton";


//Components - Main
//These are the major, complex sections that make up our overall App. They can be pages or represent large components, such as the map
import Content from "./Components/Content.js";
import MapWrapper from "./Components/MapWrapper.js";
import MenuOverlayContainer from "./Components/MenuOverlayContainer.js";




function App() {

  // Placeholder image

  useEffect(() => { document.body.style.backgroundImage = 'url("https://wallpaperaccess.com/full/1713147.jpg")' }, [])

  const { user, isAuthenticated, isLoading } = useAuth0();
 

  //use this when you want state changes to reflect for all components, such as on login/logout
  const [state, setState] = useState({});

  //use this when you dont want state to update the entire app, such as when you want to set some click behaviour
  const proxyState = {};
  //proxyState["cursorControlState"] = {"markerControl" : "drop", "markerColor" : "red"}
  proxyState["markerDropType"] = "red"
  proxyState["markerViewType"] = {red: true, blue: true, green: true}
  proxyState["mapCursorMode"] = "default"
  proxyState["markerRange"] = 1000


  //some custom events for our app
  
  const filterEvent = new Event("filterEvent");
  const markerDropEvent = new Event("markerDropEvent");
  const switchFocusEvent = new Event("switchFocusEvent");
  const eventsObject = {
    filterEvent: filterEvent,
    markerDropEvent: markerDropEvent,
    switchFocusEvent: switchFocusEvent
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated){
    return (
      <section className="landingpage">
      {/* <LoginWrapper /> */}
      <LoginButton className="loginpage" />
      <Typewriter id="landingtext"
  options={{
    strings: ['Hello welcome to PINGER'],
    autoStart: true,
    loop: true,
    pauseFor: 1500,
  }}
/>
      </section>
    )
  }
else if(isAuthenticated) {
  console.log(user)
  proxyState["userState"] = { user: user.nickname };

  //login or get user data
  fetch("http://us-central1-group-z.cloudfunctions.net/app/api/user/init", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.nickname,
      })
    }).then(console.log)

  return (
    <div className="App">
      <MapWrapper proxyState={proxyState} eventsObject={eventsObject}/>
      {/* MenuOverlayContainer: These are the controls overlaying the map
      Inputs: proxyState -> contains variables/state that other components outside this tree will need to reference
      Inputs: eventsObject -> contains logic to fire custom events that other components outside this tree will need to reference
      Inputs: user -> contains the user object from Auth0
      
      */}
      <MenuOverlayContainer proxyState={proxyState} eventsObject={eventsObject}/>
      <Canvas proxyState={proxyState}/>

    </div>
  );
}};

export default App;
