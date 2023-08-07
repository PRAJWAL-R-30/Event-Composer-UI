import React, { useEffect, useCallback } from "react";
import "./css/NewEventForm.css"
import SubEventForm from "./SubEventForm";
import { convertToRupeesFormat, 
  capitaliseFirstLetter, 
  handleTimeChange, 
  budgetInput, 
  DateInput,
  TimeInput,
  reverseRupeesFormat
 } 
  from "../Utils/utils";

import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

function DetailsForm(props) {

  const sumOfSubBudgets = useCallback(() => {
    let sum = 0;
    props.subEvents.forEach((subEvent) => {
      sum += parseInt(subEvent.estimatedBudget);
    });
    return sum;
  },[props]);

  useEffect(() => {
    if (parseInt(sumOfSubBudgets()) > parseInt(props.totalBudget)) {
      props.setBudgetExceed(true);
    }
    else {
      props.setBudgetExceed(false);
    }
  },[props, sumOfSubBudgets]);

  const onAddEvent = () => {
    const newEventObj = {
      ...props.subEventObj,
      subEventName: `Event ${props.subEvents.length + 1}`,
    };
    props.setSubEvents((prevItems) => [...prevItems, newEventObj]);
  };

  

  const onSubEventChange = (index, target, value) => {
    const subEvents = [...props.subEvents];
  
    if (target === 'subEventTime') {
      let newDate = handleTimeChange(value, props.subEvents[index].subEventDateTime);
      target = 'subEventDateTime';
      value = newDate;
    }

    if (target === 'subEventDate' || target === 'sebEventTime') {
      target = 'subEventDateTime';
    }
  
    subEvents[index] = { ...subEvents[index], [target]: value };
    props.setSubEvents(subEvents);
  };

  const deleteSubEvent = (index) => {
    props.setSubEvents((prevItems) => {
      const updatedArray = [...prevItems];
      updatedArray.splice(index, 1);
      return updatedArray;
    });
  };

  return (
    <div>
      <div className="switch-button">
        <ToggleButtonGroup
          color="primary"
          value={props.isMultiEvent}
          exclusive
          onChange={(e, value) => {
            if (value != null) {
              props.setIsMultiEvent(value);
            }
          }}
          aria-label="Platform"
        >
          <ToggleButton value={false}>Single Event</ToggleButton>
          <ToggleButton value={true}>Multi Event</ToggleButton>
        </ToggleButtonGroup>
      </div>
      {!props.isMultiEvent ? (
        <div className="single-event-form">
          <div className="display-flex-center">
            {DateInput(props.eventDateTime, (date) => {
              props.setEventDateTime(date);
            })}
            {TimeInput(props.eventDateTime, (time) => {
              props.setEventDateTime(handleTimeChange(time, props.eventDateTime));
              console.log(handleTimeChange(time, props.eventDateTime)); 
            })}
          </div>
          <div className="display-flex-center">
            <TextField
              sx={props.textFieldStyle}
              label="Event Venue"
              variant="outlined"
              className="text-field"
              value={props.eventVenue}
              onChange={(e) => {
                props.setEventVenue(capitaliseFirstLetter(e.target.value));
              }}
            />
          </div>
          <div className="display-flex-center">
            {budgetInput("Total Estimated Budget", props.totalBudget, (e) => {
              props.setTotalBudget(reverseRupeesFormat(e.target.value));
            })}
          </div>
        </div>
      ) : null}
      {props.isMultiEvent ? (
        <div className="multi-event-form">
          <div className="display-flex-space-between">
            <p className="event-label">
              Your Event:
              <span className="event-name">{props.eventName}</span>
            </p>
            {budgetInput("Total Estimated Budget", props.totalBudget, (e) => {
              props.setTotalBudget(reverseRupeesFormat(e.target.value));
            })}
          </div>
          {props.budgetExceed ? <p className='warning-text'>
            <WarningAmberIcon className="warning-icon"/>
            The sum of budgets estimated for subEvents is greater than the
            total budget estimated for the event
          </p> : null}
          <hr className="horizontal-line" />
          <SubEventForm 
            subEvents={props.subEvents}
            textFieldStyle={props.textFieldStyle}
            capitaliseFirstLetter={capitaliseFirstLetter}
            onSubEventChange={onSubEventChange}
            DateInput={DateInput}
            TimeInput={TimeInput}
            budgetInput={budgetInput} 
            deleteSubEvent={deleteSubEvent}
            onAddEvent={onAddEvent}
            convertToRupeesFormat={convertToRupeesFormat}
            reverseRupeesFormat={reverseRupeesFormat}
            subEventNameError={props.subEventNameError}
            setSubEventNameError={props.setSubEventNameError}
          />
        </div>
      ) : null}
    </div>
  );
}

export default DetailsForm;
