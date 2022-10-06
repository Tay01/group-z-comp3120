import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Content = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <h1> Hidden content only shown if you are already inside</h1>
        <h2> Can add all the good stuff here</h2>
      </div>
    )
  );
};

export default Content;