import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import "./css/editSubEventModal.css";
import TextField from "@mui/material/TextField";
import {
  textFieldStyle,
  DateInput,
  TimeInput,
  budgetInput,
  reverseRupeesFormat,
} from "../Utils/utils";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

function EditSubEvent(props) {
  const [subEvent, setSubEvent] = useState({});

  useEffect(() => {
    if (props.subEvent) {
      setSubEvent(props.subEvent);
    }
  }, [props]);

  return (
    <Modal className="Modal" open={props.open} onClose={props.onClose}>
      <div className="EditSubEvent-Container">
        <TextField
          sx={textFieldStyle}
          label="Sub Event Name"
          variant="outlined"
          className="text-field"
          value={subEvent?.subEventName}
          onChange={(e) => {
            setSubEvent({ ...subEvent, subEventName: e.target.value });
          }}
        />
        {DateInput(subEvent.subEventDateTime, (date) => {
          setSubEvent({ ...subEvent, subEventDateTime: date });
        })}
        {TimeInput(subEvent.subEventDateTime, (time) => {
          setSubEvent({ ...subEvent, subEventDateTime: time });
        })}

        <TextField
          sx={textFieldStyle}
          label="Sub Event Venue"
          variant="outlined"
          className="text-field"
          value={subEvent.subEventVenue}
          onChange={(e) => {
            setSubEvent({ ...subEvent, subEventVenue: e.target.value });
          }}
        />
        {budgetInput(
          "Total Estimated Budget",
          subEvent.estimatedBudget,
          (e) => {
            setSubEvent({
              ...subEvent,
              estimatedBudget: reverseRupeesFormat(e.target.value),
            });
          }
        )}

        <LoadingButton
          size="small"
          color="secondary"
          onClick={() => {props.saveSubEvent(subEvent)}}
          loading={props.isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
          className="NavButton save-button"
        >
          <span>Save</span>
        </LoadingButton>
      </div>
    </Modal>
  );
}

export default EditSubEvent;
