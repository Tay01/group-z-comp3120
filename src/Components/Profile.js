import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../App.css";

const Profile = () => {
  const { user, isAuthenticated, isLoading} = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture}   onError={(e)=>{e.target.onerror = null; e.target.classList.add('incase_image'); e.target.src="https://cdn-icons-png.flaticon.com/512/1256/1256643.png?w=826&t=st=1667726667~exp=1667727267~hmac=7a8017865df9f2b46428b20b9f0c365b81dae4a306e5382603680ca41c8fc864"}}

        alt={"cannot display image, login with google to see image"} />
        <p className="locale"> Locale - {user.locale} </p> 
        <h2>Name: {user.name} </h2>
        <p>Email: {user.email}</p>
      </div>
    )
  );
};

export default Profile;