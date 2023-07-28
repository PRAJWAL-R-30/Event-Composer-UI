import React, { useState } from "react";
import "./css/NewEventForm.css";

import { capitaliseFirstLetter } from "../Utils/utils";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function StartForm(props) {

  const EventNameValidate = (event) => {
    if (!event.target.value) {
      props.setEventNameError(true);
    }
  };

  return (
    <div className="form-box">
      <div className="display-flex-column">
        <TextField
          sx={props.textFieldStyle}
          label="Event Name"
          variant="outlined"
          className="text-field"
          value={props.eventName}
          required
          onBlur={EventNameValidate}
          error={props.eventNameError}
          onChange={(e) => {
            // props.setFormError(false);
            props.setEventNameError(false);
            props.setEventName(capitaliseFirstLetter(e.target.value));
          }}
        />

        <FormControl sx={props.textFieldStyle} className="text-field">
          <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.eventType}
            label="Event Type"
            onChange={(e) => {
              props.setEventType(e.target.value);
            }}
          >
            {props.allEventTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          sx={props.textFieldStyle}
          label="Event Description"
          variant="outlined"
          className="text-field"
          multiline
          value={props.eventDesc}
          onChange={(e) => {
            props.setEventDesc(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default StartForm;
