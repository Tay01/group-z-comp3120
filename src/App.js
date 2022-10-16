//Styles
import logo from "./logo.svg";
import "./App.css";

//React
import { setState, useState } from "react";

//????
import LoginButton from "./Components/LoginButton.js";
import LogoutButton from "./Components/LogoutButton.js";
import Profile from "./Components/Profile.js";

//Components - Main
//These are the major, complex sections that make up our overall App. They can be pages or represent large components, such as the map
import Content from "./Components/Content.js";
import MapWrapper from "./Components/MapWrapper.js";


//DB Testing Imports
import { CreateComment } from "./Components/server DONT USE/crud/template.js";

//Components - GUI
import ButtonComponent from "./Components/ButtonComponent.js";
import ExpandableMenu from "./Components/ExpandableMenu";
import Dropdown from "./Components/Dropdown";
import DropdownItem from "./Components/DropdownItem";

//VisualComponents - these are simple, reusable visual components that can be used to graphically represent a more complex component.
//Think of these components as an image file, or an icon. 
import BurgerMenu from "./Components/VisualComponents/BurgerMenu";


function App() {
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
                  <DropdownItem>Nothing rude</DropdownItem>
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
}

export default App;
