import React from "react";
//Components - GUI
import ButtonComponent from "./ButtonComponent.js";
import ExpandableMenu from "./ExpandableMenu";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
import LogoutButton from "./LogoutButton.js";
import Profile from "./Profile.js";


//VisualComponents - these are simple, reusable visual components that can be used to graphically represent a more complex component.
//Think of these components as an image file, or an icon.
import BurgerMenu from "./VisualComponents/BurgerMenu";
import Marker from "./VisualComponents/Marker"

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

        <div className="selectMarkerTypeDiv">
              <ExpandableMenu
                id="selectMarkerTypeButton"
                visualComponent={<Marker/>}
                text="Marker"
                proxyState={props.proxyState}
              >
                <Dropdown openRight={true}>
                  <DropdownItem>
                    <ButtonComponent
                      id="dropRedMarkerButton"
                      className="dropMarkerButton"
                      text="Red"
                      onClick={() => {
                        props.proxyState["mapCursorMode"] = "marker";
                        props.proxyState["markerDropType"] = "red";
                      }}
                    />
                  </DropdownItem>
                  <DropdownItem>
                    <ButtonComponent
                      id="dropBlueMarkerButton"
                      className="dropMarkerButton"
                      text="Blue"
                      onClick={() => {
                        props.proxyState["mapCursorMode"] = "marker";
                        props.proxyState["markerDropType"] = "blue";
                      }}
                    />
                  </DropdownItem>
                  <DropdownItem>
                    <ButtonComponent
                      id="dropGreenMarkerButton"
                      className="dropMarkerButton"
                      text="Green"
                      onClick={() => {
                        props.proxyState["mapCursorMode"] = "marker";
                        props.proxyState["markerDropType"] = "green";
                      }}
                    />
                  </DropdownItem>
                </Dropdown>
              </ExpandableMenu>
        </div>

      <div id="bottomRowMenuContainer">

        <div className="viewMarkersButtonsDiv">
          <ButtonComponent
            id="viewRedMarkersButton"
            text="Hide Red Markers"
            onClick={() => {
              props.proxyState["mapCursorMode"] = "default"
              props.proxyState["markerViewType"]["red"] =
                !props.proxyState["markerViewType"]["red"];
              document.getElementById("viewRedMarkersButton").innerHTML = props.proxyState["markerViewType"]["red"] ? "Hide Red Markers" : "Show Red Markers";
              dispatchEvent(props.eventsObject["filterEvent"]);
            }}
          />
          <ButtonComponent id="viewBlueMarkersButton" text="Hide Blue Markers" onClick={() => {
              props.proxyState["mapCursorMode"] = "default";
              props.proxyState["markerViewType"]["blue"] =
                !props.proxyState["markerViewType"]["blue"];
              document.getElementById("viewBlueMarkersButton").innerHTML = props.proxyState["markerViewType"]["blue"] ? "Hide Blue Markers" : "Show Blue Markers";
              dispatchEvent(props.eventsObject["filterEvent"]);
            }}
           />
          <ButtonComponent id="viewGreenMarkersButton" text="Hide Green Markers" onClick={() => {
              props.proxyState["mapCursorMode"] = "default";
              props.proxyState["markerViewType"]["green"] =
                !props.proxyState["markerViewType"]["green"];
              document.getElementById("viewGreenMarkersButton").innerHTML = props.proxyState["markerViewType"]["green"] ? "Hide Green Markers" : "Show Green Markers";
              dispatchEvent(props.eventsObject["filterEvent"]);
            }
          }/>
        </div>
      </div>
    </div>
  );
}
