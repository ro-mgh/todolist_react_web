import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../components/UserContext";
import SignIn from "./Signin";

const ProtectedSignin = () => {
  const [user] = useContext(UserContext);

  if (user) {
    return <Redirect to="/todolist" />;
  }

  return (
    <Route path="/signin">
      <SignIn />
    </Route>
  );
};

export default ProtectedSignin;
