import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const {user, isAuthenticated} = useAuth0(); 

  if (!isAuthenticated) {
    return <div></div>;
  }
  else {

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
  }
};

export default LogoutButton;