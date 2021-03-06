import React, { useState, useEffect, useContext } from "react";
import Tasks from "./Tasks";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import { text_decoration } from "./Styles";
import Typography from "@material-ui/core/Typography";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import AddingTask from "./AddingTask";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../components/UserContext";

const useToDoListStyles = makeStyles((theme) => ({
  container: {
    "margin-bottom": "5px",
    "margin-top": "5px",
  },
  paper_tasks: {
    "min-height": "270px",
    "background-color": theme.paperBackground,
    borderRadius: 17,
    padding: "10px",
  },
  headers: theme.fontStyle,
  paper_adding: {
    borderRadius: 17,
    "border-color": theme.fontColor,
    "border-style": "solid",
    padding: "10px",
  },
  grid_counter: {
    boxShadow: "none",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
  },
  counter_icon: {
    "margin-right": "5px",
    width: "70px",
    height: "70px",
    color: theme.fontColor,
  },
  error: {
    width: "93%",
  },
}));

const Main = (props) => {
  const classes = useToDoListStyles();

  const [user, setUser] = useContext(UserContext);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [id, setID] = useState(1);
  const [err, setErr] = useState("");

  // fetch and adds tasks from user to main page
  useEffect(() => {
    async function fetchTasks() {
      if (user) {
        setTasks([]);

        const response = await fetch(
          "https://todolist-server-ro-mgh.herokuapp.com/mytodolist",
          {
            method: "GET",
            headers: { Authorization: localStorage.getItem("token") },
            //  protect middlware add user out of toket
          }
        );
        const serverResponse = await response.json();
        console.log("main resp", serverResponse);
        if (!serverResponse.emessage) {
          setTasks(serverResponse.tasks);
        } else {
          setErr(serverResponse.emessage);
        }
      } else {
        setTasks([]);
      }
    }
    fetchTasks();
  }, [user]);

  // adding new task
  const handleClickAddNewTask = async (e) => {
    e.preventDefault();
    if (task !== "") {
      let newTask = {
        name: task,
        status: "active",
        _id: id,
      };

      if (user) {
        try {
          const response = await fetch(
            "https://todolist-server-ro-mgh.herokuapp.com/mytodolist/item",
            {
              method: "post",
              headers: {
                "Content-type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
              body: JSON.stringify({
                name: newTask.name,
              }),
            }
          );
          if (response.ok) {
            const jsonResponse = await response.json();
            const taskFromDB = await jsonResponse.task;
            newTask = taskFromDB;
          } else {
            setErr("Error occured while adding task");
          }
        } catch (e) {
          console.error(e);
          setErr("Error occured while adding task");
        }
      }
      setTasks([newTask, ...tasks]);
      setTask("");
      setID(id + 1);
    }
  };

  // changing of status when click checked
  const handleCheckbox = async (id) => {
    let newStatus = "";

    const newTasks = tasks.map((t) => {
      if (t._id === id) {
        if (t.status === "active") {
          newStatus = "complete";
          return { ...t, status: "complete" };
        } else {
          newStatus = "active";
          return { ...t, status: "active" };
        }
      } else {
        return t;
      }
    });

    setTasks(newTasks);

    if (newStatus && user) {
      try {
        const response = await fetch(
          "https://todolist-server-ro-mgh.herokuapp.com/mytodolist/item/" + id,
          {
            method: "put",
            headers: {
              "Content-type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
              id: id,
              toChange: {
                status: newStatus,
              },
            }),
          }
        );
        const serverResponse = await response.json();
        if (serverResponse.emessage) {
          setErr(serverResponse.emessage);
        }
      } catch (e) {
        console.error(e);
        setErr("Error occured on task status change");
      }
    }
  };

  // delete task from db and main
  const handleDelete = async (id) => {
    const newTasks = tasks.filter((t) => t._id !== id);
    setTasks(newTasks);

    if (user) {
      try {
        const response = await fetch(
          "https://todolist-server-ro-mgh.herokuapp.com/mytodolist/item/" + id,
          {
            method: "delete",
            headers: {
              "Content-type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
              id: id,
            }),
          }
        );
        const serverResponse = await response.json();
        if (serverResponse.emessage) {
          setErr(serverResponse.emessage);
        }
      } catch (e) {
        setErr("Error occured while task deletion");
      }
    }
  };

  return (
    <Grid container spacing={3} justify="center" className={classes.container}>
      <Grid item sm={7} xs={8}>
        <Paper className={classes.paper_adding}>
          <Typography className={classes.headers}>Add new task</Typography>
          {err ? (
            <Alert severity="error" className={classes.error}>
              {err}
            </Alert>
          ) : null}
          <AddingTask
            task={task}
            onAddTask={handleClickAddNewTask}
            onChange={(e) => setTask(e.target.value)}
          />
        </Paper>
      </Grid>
      <Grid item sm={4} className={classes.grid_counter}>
        <CheckCircleRoundedIcon className={classes.counter_icon} />
        <Typography className={classes.headers}>
          {tasks.filter((t) => t.status === "complete").length}
        </Typography>
      </Grid>
      <Grid item sm={7} xs={11}>
        <Paper className={classes.paper_tasks}>
          <Typography className={classes.headers}>Current tasks</Typography>
          <List>
            {tasks
              .filter((t) => t.status === "active")
              .map((t) => {
                return (
                  <Tasks
                    task={t}
                    onComplete={handleCheckbox}
                    onDelete={handleDelete}
                  />
                );
              })}
          </List>
        </Paper>
      </Grid>
      <Grid item sm={4} xs={11}>
        <Paper className={classes.paper_tasks}>
          <Typography className={classes.headers}>Completed tasks</Typography>
          <List>
            {tasks
              .filter((t) => t.status === "complete")
              .map((t) => {
                return (
                  <Tasks
                    task={t}
                    style={text_decoration}
                    onComplete={handleCheckbox}
                    onDelete={handleDelete}
                  />
                );
              })}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Main;
