import React from "react";
import ReactDOM from "react-dom";
import Content from "./Components/Content";
import LoginButton from "./Components/LoginButton";
import { Auth0Provider } from "@auth0/auth0-react";
import { setState, useState } from "react";
import App from "./App";

ReactDOM.render(
  <Auth0Provider
    domain="dev-4y9-6zrq.us.auth0.com"
    clientId="hHedM1B73zR7tllq3Q3RdXBiiMrPMAyi"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);