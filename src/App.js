//Styles
import logo from "./logo.svg";
import Typewriter from 'typewriter-effect';
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";

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


//DB Testing Imports
import { CreateComment } from "./Components/server DONT USE/crud/template.js";



function App() {

  const { user, isAuthenticated, isLoading } = useAuth0();

  //use this when you want state changes to reflect for all components, such as on login/logout
  const [state, setState] = useState({});

  //use this when you dont want state to update the entire app, such as when you want to set some click behaviour
  const proxyState = {};
  proxyState["markerDropType"] = "red"
  proxyState["markerViewType"] = {red: true, blue: true, green: true}


  //some custom events for our app
  
  const filterEvent = new Event("filterEvent");
  const eventsObject = {
    filterEvent: filterEvent,
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated){
    return (
      <>
      <LoginButton />
      <Typewriter
  options={{
    strings: ['Hello welcome to PINGER', 'or whatever our name is'],
    autoStart: true,
    loop: true,
  }}
/>
      </>
    )
  }
else {

  return (
    <div className="App">
      <MapWrapper proxyState={proxyState} />
      <MenuOverlayContainer proxyState={proxyState} eventsObject={eventsObject}/>


    </div>
  );
} };

export default App;
