//Styles
import Typewriter from 'typewriter-effect';
import "./App.css";

//packages
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";



//Components
import LoginButton from "./Components/LoginButton";


//Components - Main
//These are the major, complex sections that make up our overall App. They can be pages or represent large components, such as the map
import MapWrapper from "./CoreComponents/MapWrapper.js";
import MenuOverlayContainer from "./CoreComponents/MenuOverlayContainer.js";




function App() {

  //once the component renders
  useEffect(() => {
    document.body.style.backgroundImage = 'url("https://wallpaperaccess.com/full/1713147.jpg")' 
  }, [])

  const { user, isAuthenticated, isLoading } = useAuth0();
 

  //use this when you dont want state to update the entire app, such as when you want to set some click behaviour
  const appState = {};
  //appState["cursorControlState"] = {"markerControl" : "drop", "markerColor" : "red"}
  appState["markerDropType"] = "red"
  appState["markerViewType"] = {red: true, blue: true, green: true}
  appState["mapCursorMode"] = "default"
  appState["markerRange"] = 1000


  //some custom events for our app
  const eventsObject = {
    filterEvent: new Event("filterEvent"),
    markerDropEvent: new Event("markerDropEvent"),
    switchFocusEvent: new Event("switchFocusEvent"),
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
  appState["userState"] = { user: user.nickname };

  //first get user Location, then initialise the map
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) => {
      appState["userState"]["userLocation"] = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      //login or get user data
      fetch(
        "https://us-central1-group-z.cloudfunctions.net/app/api/user/init",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.nickname,
            pos: appState["userState"]["userLocation"],
          }),
        }
      ).then(console.log);
    })
  }else{
    console.log("why mang, no geolocation")
  }


  return (
    <div className="App">
      <MapWrapper appState={appState} eventsObject={eventsObject}/>
      {/* MenuOverlayContainer: These are the controls overlaying the map
      Inputs: appState -> contains variables/state that other components outside this tree will need to reference
      Inputs: eventsObject -> contains logic to fire custom events that other components outside this tree will need to reference
      Inputs: user -> contains the user object from Auth0
      
      */}
      <MenuOverlayContainer appState={appState} eventsObject={eventsObject}/>

    </div>
  );
}};

export default App;
