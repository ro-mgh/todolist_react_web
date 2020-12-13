import React, { useState } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Footer from "./components/Footer";
import Todolist from "./views/Todolist";
import Navigation from "./components/Navigation";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import UserContext from "./components/UserContext";
import ProtectedSignin from "./views/ProtectedSignin";
import ProtectedSignup from "./views/ProtectedSignup";

const theme = createMuiTheme({
  background: "linear-gradient(45deg,  #FF8E53 30%, #FE6B8B 90%)",
  backgroundForm: "#FFFFFF",
  fontColor: "#7E685A",
  fontStyle: {
    fontFamily: "Roboto",
    fontSize: "30px",
  },
  paperBackground: "#F8E9A1",
  line: "#fe6b8b",
  palette: {
    primary: {
      main: "#7E685A",
    },
  },
});

const App = () => {
  const user = useState(localStorage.getItem("token") || "");

  return (
    <UserContext.Provider value={user}>
      <Router>
        <ThemeProvider theme={theme}>
          <Navigation />
          <Switch>
            {/* <Route exact path="/">
              <Redirect to="/todolist" />;
            </Route> */}
            <Route exact path="/">
              <Todolist />
            </Route>
            <Route exact path="/todolist">
              <Todolist />
            </Route>
            <ProtectedSignin exact path="/signin" />
            <ProtectedSignup exact path="/signup" />
          </Switch>
          <Footer />
        </ThemeProvider>
      </Router>
    </UserContext.Provider>
  );
};

render(<App />, document.getElementById("root"));
