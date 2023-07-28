import React, { useState } from "react";
import "./css/NewEventForm.css";
import StartForm from "./StartForm";
import DetailsForm from "./DetailsForm";
import { textFieldStyle } from "../Utils/utils";
import { useSelector, useDispatch } from "react-redux";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import {addNewEvent} from '../Redux/Slices/EventsSlice'
import { useNavigate } from 'react-router-dom';

function NewEventForm() {
  const subEventObj = {
    subEventName: "Event 1",
    subEventDateTime: new Date(),
    subEventVenue: "",
    estimatedBudget: 0,
  };

  const [formPageNum, setFormPageNum] = useState(1);
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [isMultiEvent, setIsMultiEvent] = useState(false);
  const [eventDateTime, setEventDateTime] = useState(new Date());
  const [eventVenue, setEventVenue] = useState("");
  const [totalBudget, setTotalBudget] = useState(0);
  const [subEvents, setSubEvents] = useState([subEventObj]);
  const [eventNameError, setEventNameError] = useState(false);
  const [subEventNameError, setSubEventNameError] = useState(false)
  const [budgetExceed, setBudgetExceed] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.events);

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

  const validateStartForm = () => {
    if (!eventName) {
      setEventNameError(true);
      return false;
    }
    return true;
  };

  const validateDetailForm = () => {
    let valid = true;
    subEvents.forEach((sub) => {
      if (!sub.subEventName) {
        valid = false
      }
    });
    return valid;
  };

  //axios call to save the new event
  const postEvent = async (event) => {
    await dispatch(addNewEvent(event)).unwrap();
    navigate('/MyEvents', {replace: false});
  }

  const saveForm = () => {
    console.log(validateDetailForm())
    if( !validateDetailForm() ) {
      setSubEventNameError(true);
    } 
    const eventObj = {
      eventName: eventName,
      eventType: eventType,
      eventDesc: eventDesc,
      eventDateTime: !isMultiEvent ? new Date(eventDateTime) : null,
      eventVenue: eventVenue, 
      isMultiEvent: isMultiEvent, 
      totalBudget: totalBudget,
      subEvents: isMultiEvent ? subEvents : []
    }
    postEvent(eventObj);
  };

  const onPageChange = (PageDirection) => {
    if (PageDirection === 1) {
      if ( validateStartForm() ) {
        setFormPageNum(formPageNum + PageDirection);
      }
    } else {
      setFormPageNum(formPageNum + PageDirection);
    }
  };

  const startForm = (
    <StartForm
      eventName={eventName}
      setEventName={setEventName}
      eventType={eventType}
      setEventType={setEventType}
      eventDesc={eventDesc}
      setEventDesc={setEventDesc}
      allEventTypes={allEventTypes}
      textFieldStyle={textFieldStyle}
      // formError={formError}
      // setFormError={setFormError}
      eventNameError={eventNameError}
      setEventNameError={setEventNameError}
    />
  );

  const detailsForm = (
    <DetailsForm
      isMultiEvent={isMultiEvent}
      setIsMultiEvent={setIsMultiEvent}
      textFieldStyle={textFieldStyle}
      eventDateTime={eventDateTime}
      setEventDateTime={setEventDateTime}
      // eventTime={eventTime}
      // setEventTime={setEventTime}
      eventVenue={eventVenue}
      setEventVenue={setEventVenue}
      totalBudget={totalBudget}
      setTotalBudget={setTotalBudget}
      eventName={eventName}
      subEvents={subEvents}
      setSubEvents={setSubEvents}
      subEventObj={subEventObj}
      // formError={formError}
      // setFormError={setFormError}
      subEventNameError={subEventNameError}
      setSubEventNameError={setSubEventNameError}
      budgetExceed={budgetExceed}
      setBudgetExceed={setBudgetExceed}
    />
  );

  let formPage;

  switch (formPageNum) {
    case 1:
      formPage = startForm;
      break;
    case 2:
      formPage = detailsForm;
      break;
    default:
      formPage = null;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="NewEventForm">
        <div className="form-title">Please fill the below details</div>
        {formPage}

        <div className="Nav-btn-group">
          {formPageNum > 1 ? (  
            <Button
              className="NavButton"
              variant="contained"
              onClick={() => {
                onPageChange(-1);
              }}
            >
              Back
            </Button>
          ) : null}
          {formPageNum !== 2 ? (
            <Button
              className="NavButton"
              variant="contained"
              onClick={() => {
                onPageChange(1);
              }}
            >
              Next
            </Button>
          ) : null}
          {formPageNum === 2 ? (
            <LoadingButton
              size="small"
              color="secondary"
              onClick={saveForm}
              loading={isLoading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              className="NavButton save-button"
            >
              <span>Save</span>
            </LoadingButton>
          ) : null}
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default NewEventForm;
