import React from "react";
//Components - GUI
import ButtonComponent from "./ButtonComponent.js";
import ExpandableMenu from "./ExpandableMenu";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
import LogoutButton from "./LogoutButton.js";
import Profile from "./Profile.js";
import SelfExpander from "./SelfExpander.js";
import SelfExpanderItem from "./SelfExpanderItem.js";
import SelfExpandableMenu from "./SelfExpandableMenu.js";

//VisualComponents - these are simple, reusable visual components that can be used to graphically represent a more complex component.
//Think of these components as an image file, or an icon.
import BurgerMenu from "./VisualComponents/BurgerMenu";
import Marker from "./VisualComponents/Marker"
import MenuSlider from "./MenuSlider.js";

export default function MenuOverlayContainer(props) {
  /*this container is relatively positioned so that its components can be positioned absolutely within the overlay.
  this will allow us to have buttons that appear over the map, but are unrelated to map controls. */
  
  const [state, setState] = React.useState({
    //define states that will control the menu items here
    //these states will be passed to the menu items as props
    //the menu items will then use these states to determine how to render themselves

    "selectMarkerControl": "closed",
    

  });

  window.addEventListener("markerDropEvent", () => {
    setState({...state, "selectMarkerControl": "closed"})
    console.log("marker dropped event")
  })

  //helper functions to pass to our props for easy state changes
  const setCursorDefaultMode = () => {
    setState({
      ...state,
      "selectMarkerControl": "closed"
    })
    props.proxyState["mapCursorMode"] = "default"
  }


  return (
    <div className="menuOverlayContainer">
      {/* Top Left Menu Burger start ----------------------------------- */}
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
              id="settingsExpander"
              text="Settings"
              proxyState={props.proxyState}
            >
              <Dropdown openDown={true}>
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
      {/* Top Left Menu Burger end ----------------------------------- */}

      {/* Top Right Menu Burger start ----------------------------------- */}
      <ExpandableMenu
        id="accountButton"
        visualComponent={<BurgerMenu />}
        text="Account"
        class="menuButton"
        proxyState={props.proxyState}
      >
        <Dropdown openDown={true} openLeft={true}>
          <DropdownItem>
            <ExpandableMenu
              id="accountExpander"
              text="Settings"
              proxyState={props.proxyState}
            >
              <Dropdown openDown={true}>
                <DropdownItem>
                  <MenuSlider title="Marker Range" units="KMS" releaseFn={
                    (value) => {
                      props.proxyState["markerRange"] = value
                      window.dispatchEvent(new Event("markerRangeChange"))
                    }
                  }/>
                </DropdownItem>
                <DropdownItem> Your profile </DropdownItem>
                <DropdownItem>Nothing rude</DropdownItem>
              </Dropdown>
            </ExpandableMenu>
          </DropdownItem>
          <DropdownItem>Communities</DropdownItem>
        </Dropdown>
      </ExpandableMenu>
      {/* Top Right Menu Burger end ----------------------------------- */}

      {/* Select Marker Type Div start ----------------------------------- */}
      <div className="selectMarkerTypeDiv">
        <SelfExpandableMenu
          id="selectMarkerTypeButton"
          visualComponent={<Marker color="white" />}
          text="Marker"
          proxyState={props.proxyState}
          menuState={state}
          closeFn={setCursorDefaultMode}
          openFn={() => {
            setState({ ...state, selectMarkerControl: "open" });
          }}
        >
          <SelfExpander spawnLR={true}>
            <SelfExpanderItem>
              <ButtonComponent
                id="dropRedMarkerButton"
                className="dropMarkerButton"
                visualComponent={<Marker color="red" />}
                text="Red"
                onClick={() => {
                  props.proxyState["mapCursorMode"] = "marker";
                  props.proxyState["markerDropType"] = "red";
                }}
              />
            </SelfExpanderItem>
            <SelfExpanderItem>
              <ButtonComponent
                id="dropBlueMarkerButton"
                className="dropMarkerButton"
                visualComponent={<Marker color="blue" />}
                text="Blue"
                onClick={() => {
                  props.proxyState["mapCursorMode"] = "marker";
                  props.proxyState["markerDropType"] = "blue";
                }}
              />
            </SelfExpanderItem>
            <SelfExpanderItem>
              <ButtonComponent
                id="dropGreenMarkerButton"
                className="dropMarkerButton"
                visualComponent={<Marker color="green" />}
                text="Green"
                onClick={() => {
                  props.proxyState["mapCursorMode"] = "marker";
                  props.proxyState["markerDropType"] = "green";
                }}
              />
            </SelfExpanderItem>
          </SelfExpander>
        </SelfExpandableMenu>
      </div>
      {/* Select Marker Type Div end ----------------------------------- */}

      {/* Bottom Row Menu container start ----------------------------------- */}
      <div id="bottomRowMenuContainer">
        <div className="viewMarkersButtonsDiv">
          <ButtonComponent
            id="viewRedMarkersButton"
            text="Hide Red Markers"
            onClick={() => {
              props.proxyState["mapCursorMode"] = "default";
              props.proxyState["markerViewType"]["red"] =
                !props.proxyState["markerViewType"]["red"];
              document.getElementById("viewRedMarkersButton").innerHTML = props
                .proxyState["markerViewType"]["red"]
                ? "Hide Red Markers"
                : "Show Red Markers";
              dispatchEvent(props.eventsObject["filterEvent"]);
            }}
          />
          <ButtonComponent
            id="viewBlueMarkersButton"
            text="Hide Blue Markers"
            onClick={() => {
              props.proxyState["mapCursorMode"] = "default";
              props.proxyState["markerViewType"]["blue"] =
                !props.proxyState["markerViewType"]["blue"];
              document.getElementById("viewBlueMarkersButton").innerHTML = props
                .proxyState["markerViewType"]["blue"]
                ? "Hide Blue Markers"
                : "Show Blue Markers";
              dispatchEvent(props.eventsObject["filterEvent"]);
            }}
          />
          <ButtonComponent
            id="viewGreenMarkersButton"
            text="Hide Green Markers"
            onClick={() => {
              props.proxyState["mapCursorMode"] = "default";
              props.proxyState["markerViewType"]["green"] =
                !props.proxyState["markerViewType"]["green"];
              document.getElementById("viewGreenMarkersButton").innerHTML =
                props.proxyState["markerViewType"]["green"]
                  ? "Hide Green Markers"
                  : "Show Green Markers";
              dispatchEvent(props.eventsObject["filterEvent"]);
            }}
          />
        </div>
      </div>
      {/* Bottom Row Menu container end ----------------------------------- */}
    </div>
  );
}
