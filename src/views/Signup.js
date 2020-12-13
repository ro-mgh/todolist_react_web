import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import ULink from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../components/UserContext";

const useStyles = makeStyles((theme) => ({
  main_wrapper: {
    "margin-top": theme.spacing(3),
    "margin-bottom": theme.spacing(3),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 17,
    "background-color": theme.backgroundForm,
    "border-color": theme.fontColor,
    "border-style": "solid",
    padding: "15px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: "40px",
    background: theme.background,
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    padding: "0 30px",
  },
  error: {
    width: "100%",
    "margin-top": theme.spacing(3),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [err, setErr] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const serverResponse = await response.json();
      if (!response.emessage) {
        if (response.statusText !== "Bad Request") {
          window.localStorage.setItem(
            "token",
            "Bearer " + serverResponse.token
          );
          setUser(serverResponse.body);
          setRedirect(true);
        } else {
          setErr("Email is already registered");
        }
      } else {
        setErr(serverResponse.emessage);
      }
    } catch (e) {
      console.error(e);
      setErr("Error connecting to server");
    }
  };

  if (redirect) {
    return <Redirect to="/todolist" />;
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.main_wrapper}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {err ? (
          <Alert severity="error" className={classes.error}>
            {err}
          </Alert>
        ) : null}
        <form className={classes.form} noValidate onSubmit={handleSignup}>
          <TextField
            margin="normal"
            autoComplete="name"
            name="name"
            required
            fullWidth
            id="name"
            label="Name"
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signin">
                <ULink href="#" variant="body2">
                  {"Already have an account? Sign In"}
                </ULink>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
