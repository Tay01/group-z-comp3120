import React from 'react'
//Components - GUI
import ButtonComponent from "./ButtonComponent.js";
import ExpandableMenu from "./ExpandableMenu";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
import LogoutButton from './LogoutButton.js';
import LoginButton from "./LoginButton.js";
import Profile from "./Profile.js";

//VisualComponents - these are simple, reusable visual components that can be used to graphically represent a more complex component.
//Think of these components as an image file, or an icon. 
import BurgerMenu from "./VisualComponents/BurgerMenu";


export default function MenuOverlayContainer(props) {
  return (
    <div className="menuOverlayContainer">
      {/*this container is relatively positioned so that its components can be positioned absolutely within the overlay.
        this will allow us to have buttons that appear over the map, but are unrelated to map controls. */}

      <ExpandableMenu
        id="settingsButton"
        visualComponent={<BurgerMenu />}
        text="Settings"
        class="menuButton"
        proxyState={props.proxyState}
      >
        <Dropdown openDown={true}>
          <DropdownItem>
            <ExpandableMenu
              id="settingsButton"
              text="Settings"
              class="menuButton"
              proxyState={props.proxyState}
            >
              <Dropdown openRight={true}>
                <DropdownItem>
                  <ButtonComponent
                    id="dropMarkerButton"
                    text="Drop Marker"
                    onClick={() => {
                      props.proxyState["mapCursorMode"] = "marker";
                    }}
                  />
                </DropdownItem>
                <DropdownItem>
                  <ButtonComponent
                    id="deleteMarkerButton"
                    text="Delete Marker"
                    onClick={() => {
                      props.proxyState["mapCursorMode"] = "delete";
                    }}
                  />
                </DropdownItem>
                <DropdownItem>
                  {" "}
                  <LogoutButton />
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
        proxyState={props.proxyState}
      >
        <Dropdown openDown={true} openLeft={true} openReverse={true}>
          <DropdownItem>
            <ExpandableMenu
              id="settingsButton"
              text="Settings"
              class="menuButton"
              proxyState={props.proxyState}
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

      <div className="dropMarkerButtonsDiv">
          <button
            id="dropRedMarkerButton"
            className="dropMarkerButton"
            onClick={() => {
              props.proxyState["mapCursorMode"] = "marker";
              props.proxyState["markerDropType"] = "red";
            }}
          >
            Red
          </button>
          <button
            id="dropBlueMarkerButton"
            className="dropMarkerButton"
            onClick={() => {
              props.proxyState["mapCursorMode"] = "marker";
              props.proxyState["markerDropType"] = "blue";
            }}
          >
            Blue
          </button>
          <button
            id="dropGreenMarkerButton"
            className="dropMarkerButton"
            onClick={() => {
              props.proxyState["mapCursorMode"] = "marker";
              props.proxyState["markerDropType"] = "green";
            }}
          >
            Green
          </button>
        </div>
      </div>
  );
}
