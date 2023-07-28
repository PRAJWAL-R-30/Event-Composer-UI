import React from 'react';
import './css/NewEventForm.css';

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

function SubEventForm(props) {

  const EventNameValidate = (event) => {
    if (!event.target.value) {
      props.setSubEventNameError(true);
    }
  };

  const checkSubEventNameError = (name) => {
    if (props.subEventNameError && !name) {
      console.log("Returning True")
      return true;
    }
    return false;
  }

    return (
        <div className="sub-event-container">
            {props.subEvents.map((sub, index) => (
              <div key={index} className="sub-event-form">
                <p className="serial-number">{index + 1}.</p>
                <TextField
                  sx={props.textFieldStyle}
                  label="Event Name"
                  variant="outlined"
                  className="text-field"
                  value={sub.subEventName}
                  required
                  onBlur={EventNameValidate}
                  error={checkSubEventNameError(sub.subEventName)}
                  onChange={(e) => {
                    props.onSubEventChange(
                      index,
                      "subEventName",
                      props.capitaliseFirstLetter(e.target.value)
                    );
                  }}
                />
                {props.DateInput(sub.subEventDateTime, (date) => {
                  props.onSubEventChange(index, "subEventDate", date);
                })}
                {props.TimeInput(sub.subEventDateTime, (time) => {
                  props.onSubEventChange(index, "subEventTime", time);
                })}
                <TextField
                  sx={props.textFieldStyle}
                  label="Event Venue"
                  variant="outlined"
                  className="text-field"
                  value={sub.subEventVenue}
                  onChange={(e) => {
                    props.onSubEventChange(
                      index,
                      "subEventVenue",
                      props.capitaliseFirstLetter(e.target.value)
                    );
                  }}
                />
                {props.budgetInput("Estimated Budget", sub.estimatedBudget, (e) => {
                  props.onSubEventChange(
                    index,
                    "estimatedBudget",
                    props.reverseRupeesFormat(e.target.value)
                  );
                })}
                <DeleteOutlinedIcon
                  className="delete-icon"
                  onClick={() => props.deleteSubEvent(index)}
                />
              </div>
            ))}
            <Button
              className="add-button"
              variant="contained"
              onClick={props.onAddEvent}
            >
              + Add Sub-Event
            </Button>
          </div>
    );
}

export default SubEventForm; 