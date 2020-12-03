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
  return (
    <ListItem
      key={props.id}
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
          inputProps={{ "aria-labelledby": props.id }}
        />
      </ListItemIcon>
      <ListItemText
        id={props.id}
        primary={`Line item ${props.id + 1}`}
        css={props.style}
      />
      {/* <ListItemSecondaryAction> */}
      <IconButton edge="end" aria-label="delete">
        <DeleteIcon />
      </IconButton>
      {/* </ListItemSecondaryAction> */}
    </ListItem>
  );
};

export default Tasks;
