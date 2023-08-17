import React from "react";
import {
  getDate,
  getTime,
  textFieldStyle,
  DateInput,
  TimeInput,
} from "../Utils/utils";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function EventBasicDetails(props) {
  const allEventTypes = [
    "Social events",
    "Cultural events",
    "Corporate events",
    "Sporting events",
    "Educational events",
    "Political events",
    "Religious events",
    "Fundraiser events",
    "Community events",
    "Trade shows",
    "Other",
  ];

  return (
    <div className="event-details-top-block">
      {!props.isEditing ? (
        <div className="event-basic-details">
          <div className="label-value">
            <p className="label">Event Name:</p>
            <p className="value">{props.eventDetails.eventName}</p>
          </div>
          <div className="label-value">
            <p className="label">Event Type:</p>
            <p className="value">{props.eventDetails.eventType}</p>
          </div>
          <div className="label-value">
            <p className="label">Event Description:</p>
            <p className="value">{props.eventDetails.eventDesc}</p>
          </div>
          {!props.eventDetails.isMultiEvent ? (
            <div>
              <div className="label-value">
                <p className="label">Event Date:</p>
                <p className="value">
                  {getDate(props.eventDetails.eventDateTime)}
                </p>
              </div>
              <div className="label-value">
                <p className="label">Event Time:</p>
                <p className="value">
                  {getTime(props.eventDetails.eventDateTime)}
                </p>
              </div>
              <div className="label-value">
                <p className="label">Event Venue:</p>
                <p className="value">{props.eventDetails.eventVenue}</p>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <TextField
              sx={textFieldStyle}
              label="Event Name"
              variant="outlined"
              className="text-field"
              value={props.basicDetails.eventName}
              onChange={(e) => {
                props.setBasicDetails({
                  ...props.basicDetails,
                  eventName: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <FormControl sx={textFieldStyle} className="text-field">
              <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.basicDetails.eventType}
                label="Event Type"
                onChange={(e) => {
                  props.setBasicDetails({
                    ...props.basicDetails,
                    eventType: e.target.value,
                  });
                }}
              >
                {allEventTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={5}>
            <div className="switch-button-edit">
              <ToggleButtonGroup
                color="primary"
                value={props.basicDetails.isMultiEvent}
                exclusive
                onChange={(e, value) => {
                  if (value != null) {
                    props.setBasicDetails({
                      ...props.basicDetails,
                      isMultiEvent: value,
                    });
                  }
                }}
                aria-label="Platform"
              >
                <ToggleButton value={false}>Single Event</ToggleButton>
                <ToggleButton value={true}>Multi Event</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </Grid>
          {!props.basicDetails.isMultiEvent ? (
            <>
              <Grid item xs={5}>
                <TextField
                  sx={textFieldStyle}
                  label="Event Venue"
                  variant="outlined"
                  className="text-field"
                  value={props.basicDetails.eventVenue}
                  onChange={(e) => {
                    props.setBasicDetails({
                      ...props.basicDetails,
                      eventVenue: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                {DateInput(props.basicDetails.eventDateTime, (date) => {
                  props.setBasicDetails({
                    ...props.basicDetails,
                    eventDateTime: date,
                  });
                })}
              </Grid>
              <Grid item xs={5}>
                {TimeInput(props.basicDetails.eventDateTime, (time) => {
                  props.setBasicDetails({
                    ...props.basicDetails,
                    eventDateTime: time,
                  });
                })}
              </Grid>
            </>
          ) : null}
          <Grid item xs={5}>
            <TextField
              sx={textFieldStyle}
              label="Event Description"
              variant="outlined"
              className="text-field"
              multiline
              value={props.basicDetails.eventDesc}
              onChange={(e) => {
                props.setBasicDetails({
                  ...props.basicDetails,
                  eventDesc: e.target.value,
                });
              }}
            />
          </Grid>
        </Grid>
      )}

      {props.isEditing ? (
        <div className="button-group">
          <LoadingButton
            size="small"
            color="secondary"
            onClick={props.saveBasicDetail}
            loading={props.basicDetailsLoading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            className="NavButton save-button"
          >
            <span>Save</span>
          </LoadingButton>
          <Button
            className="NavButton"
            variant="contained"
            onClick={
              props.onCancelEdit}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div className="Edit-button">
          <Button
          
            className="NavButton"
            variant="contained"
            onClick={() => {
              props.onEdit();
            }}
          >
            Edit
          </Button>
        </div>
      )}
    </div>
  );
}

export default EventBasicDetails;
