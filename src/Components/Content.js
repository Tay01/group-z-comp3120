// import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import logo from "../logo.svg";
// import "../App.css";

// import LoginButton from "./LoginButton.js";
// import LogoutButton from "./LogoutButton.js";


// const Content = () => {
//   const { user, isAuthenticated, isLoading } = useAuth0();

//   if (isLoading) {
//     return <div>Loading ...</div>;
//   }

//   if (!isAuthenticated){
//     return (
//       <>
//       {/* //add all pre auth content here  */}
//       <LoginButton />
//       </>
//     )
//   }
//   else {

//   return (
//     isAuthenticated && (
//       <> 
//       {/* // add all post auth content here  */}
//       <h1> You are in </h1>
//       <LogoutButton />

//       </>
//     )
//   );
// }
// };

// export default Content;