import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LinkMU from "@material-ui/core/Link";
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
    width: "100%", // Fix IE11 issue.
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

export default function SignIn() {
  const classes = useStyles();

  const [user, setUser] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [err, setErr] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://todolist-server-ro-mgh.herokuapp.com/signin",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      const serverResponse = await response.json();
      if (!serverResponse.emessage) {
        if (response.statusText !== "Bad Request") {
          window.localStorage.setItem(
            "token",
            "Bearer " + serverResponse.token
          );
          setUser(serverResponse.body);
          setRedirect(true);
        } else {
          setErr("Error occured");
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
          Sign in
        </Typography>
        {err ? (
          <Alert severity="error" className={classes.error}>
            {err}
          </Alert>
        ) : null}
        <form className={classes.form} noValidate onSubmit={handleSignin}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup">
                <LinkMU variant="body2">
                  {"Don't have an account? Sign Up"}
                </LinkMU>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
