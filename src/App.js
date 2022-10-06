import logo from './logo.svg';
import './App.css';
import MapComponent from './Components/MapComponent.js';
import ButtonComponent from './Components/ButtonComponent';
import StateWrapper from './StateWrapper.js';

function App() {
  const sharedState = {}
  const setState = (stateName, stateValue) => {
    sharedState[stateName] = stateValue;
  }
  const getState = (stateName) => {
    return sharedState[stateName];
  }
  return (
    <div className="App">
      <MapComponent appState={sharedState}/>
      <ButtonComponent id="dropmarkerbutton" text="Drop Marker" onClick={() => {sharedState["mapCursorMode"] = "marker"}}/>
      <ButtonComponent id="deletemarkerbutton" text="Delete Marker" onClick={() => {sharedState["mapCursorMode"] = "delete"}}/>
    </div>
  );
}

export default App;
