import logo from './logo.svg';
import './App.css';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import LoginButton from './Components/LoginButton.js';
import LogoutButton from './Components/LogoutButton.js';
import Profile from './Components/Profile.js';
import Content from './Components/Content.js';
import MapComponent from './Components/MapComponent.js';
import ButtonComponent from './Components/ButtonComponent.js';
import StateWrapper from './StateWrapper.js';
import { setState, useState } from 'react'

function App() {
  //use this when you want state changes to reflect for all components, such as on login/logout
  const [state, setState] = useState({})

  //use this when you dont want state to update the entire app, such as when you want to set some click behaviour 
  const proxyState = {}
  const setProxyState = (stateName, stateValue) => {
    proxyState[stateName] = stateValue;
  }
  const getProxyState = (stateName) => {
    return proxyState[stateName];
  }

  
  return (
    <div className="App">
      <LoginButton /> 
      <LogoutButton /> 
      <Profile /> 
      <Content />
      <MapComponent appState={proxyState}/>
      <ButtonComponent id="dropMarkerButton" text="Drop Marker" onClick={() => {proxyState["mapCursorMode"] = "marker"}}/>
      <ButtonComponent id="deleteMarkerButton" text="Delete Marker" onClick={() => {proxyState["mapCursorMode"] = "delete"}}/>
      <ButtonComponent id="accountButton" text="Account" />
      <ButtonComponent id="settingsButton" text="Settings" />
    </div>
  );
}

export default App;
