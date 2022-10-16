import logo from "./logo.svg";
import Typewriter from 'typewriter-effect';
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import LoginButton from "./Components/LoginButton.js";
import LogoutButton from "./Components/LogoutButton.js";
import Profile from "./Components/Profile.js";
import Content from "./Components/Content.js";
import MapComponent from "./Components/MapComponent.js";
import ButtonComponent from "./Components/ButtonComponent.js";
import Dropdown from "./Components/Dropdown";
import StateWrapper from "./StateWrapper.js";
import MapWrapper from "./Components/MapWrapper.js";
import { setState, useState } from "react";

//DB Testing Imports
import { CreateComment } from "./Components/server DONT USE/crud/template.js";
import BurgerMenu from "./Components/VisualComponents/BurgerMenu";
import ExpandableMenu from "./Components/ExpandableMenu";
import DropdownItem from "./Components/DropdownItem";

function App() {

  const { user, isAuthenticated, isLoading } = useAuth0();

  //use this when you want state changes to reflect for all components, such as on login/logout
  const [state, setState] = useState({});

  //use this when you dont want state to update the entire app, such as when you want to set some click behaviour
  const proxyState = {};
  const setProxyState = (stateName, stateValue) => {
    proxyState[stateName] = stateValue;
  };
  const getProxyState = (stateName) => {
    return proxyState[stateName];
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
    strings: ['Hello welcome to safe spot', 'or whatever our name is'],
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
      <div className="menuOverlayContainer">
        {/*this container is relatively positioned so that its components can be positioned absolutely within the overlay.
        this will allow us to have buttons that appear over the map, but are unrelated to map controls. */}

        <ExpandableMenu
          id="settingsButton"
          visualComponent={<BurgerMenu />}
          text="Settings"
          class="menuButton"
          proxyState={proxyState}
        >
          <Dropdown openDown={true}>
            <DropdownItem>
              <ExpandableMenu
                id="settingsButton"
                text="Settings"
                class="menuButton"
                proxyState={proxyState}
              >
                <Dropdown openRight={true}>
                  <DropdownItem>
                    <ButtonComponent
                      id="dropMarkerButton"
                      text="Drop Marker"
                      onClick={() => {
                        proxyState["mapCursorMode"] = "marker";
                      }}
                    />
                  </DropdownItem>
                  <DropdownItem>
                    <ButtonComponent
                      id="deleteMarkerButton"
                      text="Delete Marker"
                      onClick={() => {
                        proxyState["mapCursorMode"] = "delete";
                      }}
                    />
                  </DropdownItem>
                  <DropdownItem> <LogoutButton />
                  </DropdownItem>
                </Dropdown>
              </ExpandableMenu>
            </DropdownItem>
            <DropdownItem>Communities</DropdownItem>
          </Dropdown>
        </ExpandableMenu>
        <ExpandableMenu
          id="accountButton"
          visualComponent={<BurgerMenu />}
          text="Account"
          class="menuButton"
          proxyState={proxyState}
        >
          <Dropdown openDown={true} openLeft={true} openReverse={true}>
            <DropdownItem>
              <ExpandableMenu
                id="settingsButton"
                text="Settings"
                class="menuButton"
                proxyState={proxyState}
              >
                <Dropdown openLeft={true}>
                  <DropdownItem>Nothing rude</DropdownItem>
                  <DropdownItem>Nothing rude</DropdownItem>
                  <DropdownItem>Nothing rude</DropdownItem>
                </Dropdown>
              </ExpandableMenu>
            </DropdownItem>
            <DropdownItem>Communities</DropdownItem>
          </Dropdown>
        </ExpandableMenu>
      </div>

      <LoginButton />
      <LogoutButton />
      <Profile />
      <Content />
      <CreateComment />
    </div>
  );
} };

export default App;
