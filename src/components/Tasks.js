import React from "react";
/** @jsx jsx */
import { jsx } from "@emotion/react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

const Tasks = (props) => {
  const { task, style } = props;
  console.log(1.1, props);
  return (
    <ListItem
      key={task._id}
      role={undefined}
      dense
      button
      alignItems="center"
      // onClick={handleToggle(value)}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          // checked={checked.indexOf(value) !== -1}
          // tabIndex={-1}
          disableRipple
          inputProps={{ "aria-labelledby": task._id }}
        />
      </ListItemIcon>
      <ListItemText id={task._id} primary={task.name} css={style} />
      {/* <ListItemSecondaryAction> */}
      <IconButton edge="end" aria-label="delete">
        <DeleteIcon />
      </IconButton>
      {/* </ListItemSecondaryAction> */}
    </ListItem>
  );
};

export default Tasks;
