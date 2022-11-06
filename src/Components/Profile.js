import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../App.css";

const Profile = () => {
  const { user, isAuthenticated, isLoading, user_metadata} = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={"cannot display image, login with google to see image"} />
        <p className="locale"> Locale - {user.locale} </p> 
        <h2>Name: {user.name} </h2>
        <p>Email: {user.email}</p>
      </div>
    )
  );
};

export default Profile;