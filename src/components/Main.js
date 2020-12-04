import React, { useState, useEffect } from "react";
import Tasks from "./Tasks";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { text_decoration } from "./Styles";
import Typography from "@material-ui/core/Typography";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import AddingTask from "./AddingTask";

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
    "margin-top": "10px",
    width: "70px",
    height: "70px",
    color: theme.fontColor,
  },
}));

const mockDB = [
  {
    _id: "5fb1788413e5a31d8a9c45b2",
    status: "active",
    name: "test1A",
    createdBy: "5fb1787713e5a31d8a9c45b1",
    createdAt: "2020-11-15T18:50:44.198+00:00",
    updatedAt: "2020-11-15T18:50:44.198+00:00",
    __v: "0",
  },
  {
    _id: "5fb1788413e5a31d8a9c45b2",
    status: "complete",
    name: "test2C",
    createdBy: "5fb1787713e5a31d8a9c45b1",
    createdAt: "2020-11-15T18:50:44.198+00:00",
    updatedAt: "2020-11-15T18:50:44.198+00:00",
    __v: "0",
  },
  {
    _id: "5fb1788413e5a31d8a9c45b2",
    status: "active",
    name: "test3A",
    createdBy: "5fb1787713e5a31d8a9c45b1",
    createdAt: "2020-11-15T18:50:44.198+00:00",
    updatedAt: "2020-11-15T18:50:44.198+00:00",
    __v: "0",
  },
];

const Main = (props) => {
  const classes = useToDoListStyles();

  const tasksDB = mockDB;
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(tasksDB || []);

  const handleClickAddNewTask = (e) => {
    e.preventDefault();
    if (task !== "") {
      setTasks(
        tasks.push({
          name: task,
          status: "active",
          _id: `task ${1}`,
        })
      );
      setTask("");
      console.log(tasks, task);
    }
  };

  /// Use Effect to update list of

  return (
    <Grid container spacing={3} justify="center" className={classes.container}>
      <Grid item xs={7}>
        <Paper className={classes.paper_adding}>
          <Typography className={classes.headers}>Add new task</Typography>
          {/* <div> {task}</div> */}
          <AddingTask
            task={task}
            onAddTask={handleClickAddNewTask}
            onChange={(e) => setTask(e.target.value)}
          />
        </Paper>
      </Grid>
      <Grid item xs={4} className={classes.grid_counter}>
        <CheckCircleRoundedIcon className={classes.counter_icon} />
        <Typography className={classes.headers}>2</Typography>
      </Grid>
      <Grid item xs={7}>
        <Paper className={classes.paper_tasks}>
          <Typography className={classes.headers}>Current tasks</Typography>
          {tasks
            .filter((t) => t.status === "active")
            .map((t) => {
              return <Tasks task={t} />;
            })}
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper_tasks}>
          <Typography className={classes.headers}>Completed tasks</Typography>
          {tasks
            .filter((t) => t.status === "complete")
            .map((t) => {
              return <Tasks task={t} style={"text_decoration": "line-through"} />;
            })}
        </Paper>
      </Grid>
    </Grid>
  );
};

// {...ele,oldArr}

export default Main;
