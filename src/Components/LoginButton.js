import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const {user, isAuthenticated} = useAuth0(); 

  if (isAuthenticated) {
    return <div></div>;
  }
  else {

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
  }


};

export default LoginButton;