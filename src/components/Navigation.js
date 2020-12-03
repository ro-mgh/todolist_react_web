import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
// import { useNavigationStyles } from "./Styles";
import { makeStyles } from "@material-ui/core/styles";

export const useNavigationStyles = makeStyles((theme) => ({
  root: {
    background: theme.background,
    "box-shadow": "None",
  },
  toolbar: {
    display: "flex",
    "justify-content": "space-between",
  },
  button: {
    color: "white",
    "text-decoration": "none",
  },
  slogan: {
    "font-family": "'Satisfy', cursive",
    "text-decoration": "none",
    color: theme.fontColor,
    "font-size": "33px",
    "-webkit-font-smoothing": "antialiased",
  },
}));

const Navigation = () => {
  const classes = useNavigationStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Typography>
          <Link to="./todolist" className={classes.slogan}>
            Let's do it!
          </Link>
        </Typography>
        <div>
          <Button color="inherit">
            <Link to="./signin" className={classes.button}>
              Signin
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="./signup" className={classes.button}>
              Signup
            </Link>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
