import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Footer from "./components/Footer";
import Todolist from "./views/Todolist";
import Mytodolist from "./views/Mytodolist";
import SignIn from "./views/Signin";
import SignUp from "./views/Signup";
import Navigation from "./components/Navigation";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { UserContext } from "./components/UserContext";

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
  const user = useState("i");

  return (
    <Router>
      <UserContext.Provider value={user}>
        <ThemeProvider theme={theme}>
          {/* 
        local storage - web auth ///  
        react context  (if token in local storage - add to context)
        */}

          {/* to make custom routes (protected)  (screenshots) */}
          <Switch>
            <Route exact path="/todolist">
              <Todolist />
            </Route>
            <Route path="/mytodolist">
              <Mytodolist />
            </Route>
            <Route path="/signin">
              <Navigation />
              <SignIn />
            </Route>
            <Route path="/signup">
              <Navigation />
              <SignUp />
            </Route>
          </Switch>
          <Footer />
        </ThemeProvider>
      </UserContext.Provider>
    </Router>
  );
};

render(<App />, document.getElementById("root"));
