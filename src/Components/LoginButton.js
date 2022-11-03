import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../App.css";
import Typewriter from 'typewriter-effect';


const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (<img src="https://is2-ssl.mzstatic.com/image/thumb/Purple115/v4/cd/a0/29/cda029c2-9cda-4689-f248-c7a800bc9919/source/256x256bb.jpg" width="20px" height="20px"
  className="loginButton" id="loggymark"
  onClick={() => loginWithRedirect()} /> )
};
  

export default LoginButton;