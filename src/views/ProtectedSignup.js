import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../components/UserContext";
import Signup from "./Signup";

const ProtectedSignup = () => {
  const [user] = useContext(UserContext);

  if (user) {
    return <Redirect to="/todolist" />;
  }

  return (
    <Route path="/signup">
      <Signup />
    </Route>
  );
};

export default ProtectedSignup;
