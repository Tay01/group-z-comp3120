import React from "react";
//Components - GUI
import ButtonComponent from "../Components/ButtonComponent.js";
import ExpandableMenu from "../Components/ExpandableMenu";
import Dropdown from "../Components/Dropdown";
import DropdownItem from "../Components/DropdownItem";
import LogoutButton from "../Components/LogoutButton.js";
import Profile from "../Components/Profile.js";
import SelfExpander from "../Components/SelfExpander.js";
import SelfExpanderItem from "../Components/SelfExpanderItem.js";
import SelfExpandableMenu from "../Components/SelfExpandableMenu.js";
import CommunitiesPage from "../Components/CommunitiesPage.js";

//VisualComponents - these are simple, reusable visual components that can be used to graphically represent a more complex component.
//Think of these components as an image file, or an icon.
import BurgerMenu from "../Components/VisualComponents/BurgerMenu";
import Marker from "../Components/VisualComponents/Marker"
import MenuSlider from "../Components/MenuSlider.js";

export default function MenuOverlayContainer(props) {
  /*this container is relatively positioned so that its components can be positioned absolutely within the overlay.
  this will allow us to have buttons that appear over the map, but are unrelated to map controls. */
  
  const [state, setState] = React.useState({
    //define states that will control the menu items here
    //these states will be passed to the menu items as props
    //the menu items will then use these states to determine how to render themselves

    "selectMarkerControl": "closed",
    

  });

  //EVENT LISTENERS FOR THE ENTIRE GUI MENU
  //bind functions to trigger for certain events here. These functions can be passed to the menu items as props
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
    props.appState["mapCursorMode"] = "default"
  }

  //GLOSSARY OF GUI ITEMS
  //ExpandableMenu :: A small div with a visual button that contains a 'Dropdown' div. The Dropdown div is hidden until clicked.
  //Dropdown :: Intended for use with an expandable menu, this is a div that contains a list of 'DropdownItem' components.
  //DropdownItem :: Think of this as the "<li>" tag, if the Dropdown is the "<ul>" tag. You can put whatever you like in a DropdownItem, but it mainly exists for styling.

  return (
    <div className="menuOverlayContainer">
      {/* Top Left Menu Burger start ----------------------------------- */}
      <ExpandableMenu
        id="topLeftExpandableMenu"
        visualComponent={<BurgerMenu />}
        text="Settings"
        class="menuButton"
        appState={props.appState}
      >
        <Dropdown openDown={true}>
          <DropdownItem>
            <ExpandableMenu
              id="firstLeftExpander"
              text="Profile"
              appState={props.appState}
            >
              <Dropdown openDown={true}>
                <DropdownItem>
                  <ButtonComponent
                    id="dropMarkerButton"
                    text="Drop Marker"
                    onClick={() => {
                      props.appState["mapCursorMode"] = "marker";
                    }}
                  />
                </DropdownItem>
                <DropdownItem>
                  <ButtonComponent
                    id="deleteMarkerButton"
                    text="Delete Marker"
                    onClick={() => {
                      props.appState["mapCursorMode"] = "delete";
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
          <DropdownItem>
            <ExpandableMenu
              id="secondLeftExpander"
              text="Communities"
              appState={props.appState}
            >
              <Dropdown openDown={true}>
                <DropdownItem>
                  <CommunitiesPage appState={props.appState}></CommunitiesPage>
                  </DropdownItem>
                </Dropdown>
              </ExpandableMenu>
              </DropdownItem>
        </Dropdown>
      </ExpandableMenu>
      {/* Top Left Menu Burger end ----------------------------------- */}

      {/* Top Right Menu Burger start ----------------------------------- */}
      <ExpandableMenu
        id="accountButton"
        visualComponent={<BurgerMenu />}
        text="Account"
        class="menuButton"
        appState={props.appState}
      >
        <Dropdown openDown={true} openLeft={true}>
          <DropdownItem>
            <ExpandableMenu
              id="accountExpander"
              text="Settings"
              appState={props.appState}
            >
              <Dropdown openDown={true}>
                <DropdownItem>
                  <MenuSlider title="Marker Range" units="M" min={10} max={5000} releaseFn={
                    (value) => {
                      props.appState["markerRange"] = value
                      window.dispatchEvent(new Event("markerRangeChangedEvent"))
                    }
                  }/>
                </DropdownItem>
                <DropdownItem>Nothing rude</DropdownItem>
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
          appState={props.appState}
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
                  props.appState["mapCursorMode"] = "marker";
                  props.appState["markerDropType"] = "red";
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
                  props.appState["mapCursorMode"] = "marker";
                  props.appState["markerDropType"] = "blue";
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
                  props.appState["mapCursorMode"] = "marker";
                  props.appState["markerDropType"] = "green";
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
              props.appState["mapCursorMode"] = "default";
              props.appState["markerViewType"]["red"] =
                !props.appState["markerViewType"]["red"];
              document.getElementById("viewRedMarkersButton").innerHTML = props
                .appState["markerViewType"]["red"]
                ? "Hide Red Markers"
                : "Show Red Markers";
              dispatchEvent(props.eventsObject["filterEvent"]);
            }}
          />
          <ButtonComponent
            id="viewBlueMarkersButton"
            text="Hide Blue Markers"
            onClick={() => {
              props.appState["mapCursorMode"] = "default";
              props.appState["markerViewType"]["blue"] =
                !props.appState["markerViewType"]["blue"];
              document.getElementById("viewBlueMarkersButton").innerHTML = props
                .appState["markerViewType"]["blue"]
                ? "Hide Blue Markers"
                : "Show Blue Markers";
              dispatchEvent(props.eventsObject["filterEvent"]);
            }}
          />
          <ButtonComponent
            id="viewGreenMarkersButton"
            text="Hide Green Markers"
            onClick={() => {
              props.appState["mapCursorMode"] = "default";
              props.appState["markerViewType"]["green"] =
                !props.appState["markerViewType"]["green"];
              document.getElementById("viewGreenMarkersButton").innerHTML =
                props.appState["markerViewType"]["green"]
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
