import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../App.css";
import Typewriter from 'typewriter-effect';


const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="loginButton" onClick={() => loginWithRedirect()}>{ <Typewriter id="landingtext"
  options={{
    strings: ['Login or signup'],
    autoStart: true,
    loop: true,
    pauseFor: 10000,
  }}
/>}</button>;
};

export default LoginButton;