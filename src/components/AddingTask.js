import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
/** @jsx jsx */
import { jsx } from "@emotion/react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";

const useAddingTask = makeStyles((theme) => ({
  button: {
    background: theme.background,
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: "26px",
    padding: "0 30px",
  },
  input_form: {
    width: "100%",
  },
}));

const AddingTask = (props) => {
  const classes = useAddingTask();

  // getting access to tasks of props.user

  return (
    <div>
      <FormControl fullWidth className={classes.input_form} button="true">
        <InputLabel htmlFor="task-adding" color="primary">
          I should ...
        </InputLabel>
        <Input
          id="task-adding"
          onChange={props.onChange}
          value={props.task}
          endAdornment={
            <InputAdornment position="end">
              <Button className={classes.button} onClick={props.onAddTask}>
                ADD
              </Button>
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
};

export default AddingTask;
