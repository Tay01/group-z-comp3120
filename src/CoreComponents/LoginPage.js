import React from "react";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../App.css";


const LoginPage = () => {
    const { loginWithRedirect } = useAuth0();
  useEffect(() => {
    const button = window.document.getElementById("theloginbutton");

    function transitionOut() {
      const screenout = window.document.getElementById("screenout");
      screenout.classList.add("tsc");
    }

    button.addEventListener("click", () => {
      transitionOut();
        setTimeout(() => {
            loginWithRedirect();
            }, 1000);
    });
  }, []);

  return (
    <div id="loginbody">
        <div id="ping1"></div>
        <div id="ping2"></div>

        <div id="textcontainer">
          <p id="loginP" className="letter">
            p
          </p>
          <p id="loginI" className="letter">
            i
          </p>
          <p id="loginN" className="letter">
            n
          </p>
          <p id="loginG" className="letter">
            g
          </p>
          <p id="loginE" className="letter">
            e
          </p>
          <p id="loginR" className="letter">
            r
          </p>
        </div>
        <button id="theloginbutton">log-in</button>
        <div id="screenout" className=""></div>
    </div>
  );
};

export default LoginPage;
