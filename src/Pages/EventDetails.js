import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./css/EventDetails.css";
import MyEventsData from "../JSON/myEvents.json";
import Expenditure from "../Components/Expenditure";
import SubEventCard from "../Components/SubEventCard";
import {
  getDate,
  getTime,
  budgetInput,
  reverseRupeesFormat,
  textFieldStyle,
  capitaliseFirstLetter,
  convertToRupeesFormat,
} from "../Utils/utils";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { CopyAllSharp } from "@mui/icons-material";

function EventDetails(props) {
  const { id } = useParams();

  const [myEvents, setMyEvents] = useState(MyEventsData.myEvents);
  const [selectedSubEvent, setSelectedSubEvent] = useState(0);

  const getEventDetails = (id) => {
    return myEvents.find((item) => item.id === id);
  };

  const [eventDetails, setEventDetails] = useState(
    getEventDetails(parseInt(id))
  );

  const onEdit = () => {
    console.log("Edit details clicked");
  };

  const expenditureObj = {
    description: "",
    amount: 0,
    remarks: "",
  };

  const onAddExpenditure = () => {
    console.log("On Add expenditure");
    setEventDetails({
      ...eventDetails,
      expenditures: eventDetails.isMultiEvent
        ? [
            ...eventDetails.subEvents[selectedSubEvent].expenditures,
            expenditureObj
          ]
        : [...eventDetails.expenditures, expenditureObj]
    });
  };

  const onExpChange = (index, target, value) => {

    if (eventDetails.isMultiEvent) {
      const newEventDetails = { ...eventDetails };
      const expenditures = newEventDetails.subEvents[selectedSubEvent].expenditures;
      const updatedExpenditure = { ...expenditures[index], [target]: value };
      expenditures[index] = updatedExpenditure;
      setEventDetails(newEventDetails);
    }
    else{
      const expenditures = [...eventDetails.expenditures];
      expenditures[index] = { ...expenditures[index], [target]: value };
      setEventDetails({ ...eventDetails, expenditures });
    }
    console.log(eventDetails);
    
  };

  const deleteExp = (index) => {
    const expenditures = [...eventDetails.expenditures];
    expenditures.splice(index, 1);
    setEventDetails({ ...eventDetails, expenditures });
  };

  return (
    <div className="event-details-page">
      <div className="event-details-top-block">
        <div className="event-basic-details">
          <div className="label-value">
            <p className="label">Event Name:</p>
            <p className="value">{eventDetails.eventName}</p>
          </div>
          <div className="label-value">
            <p className="label">Event Type:</p>
            <p className="value">{eventDetails.eventType}</p>
          </div>
          <div className="label-value">
            <p className="label">Event Description:</p>
            <p className="value">{eventDetails.eventDesc}</p>
          </div>
          {!eventDetails.isMultiEvent ? (
            <div>
              <div className="label-value">
                <p className="label">Event Date:</p>
                <p className="value">{getDate(eventDetails.eventDate)}</p>
              </div>
              <div className="label-value">
                <p className="label">Event Time:</p>
                <p className="value">{getTime(eventDetails.eventDate)}</p>
              </div>
              <div className="label-value">
                <p className="label">Event Venue:</p>
                <p className="value">{eventDetails.eventVenue}</p>
              </div>
            </div>
          ) : null}
        </div>
        <div className="Edit-button">
          <Button
            className="NavButton"
            variant="contained"
            onClick={() => {
              onEdit();
            }}
          >
            Edit
          </Button>
        </div>
      </div>
      <div className="budgetInput">
        {budgetInput(
          "Total Estimated Budget",
          eventDetails.totalBudget,
          (e) => {
            setEventDetails({
              ...eventDetails,
              totalBudget: reverseRupeesFormat(e.target.value),
            });
          }
        )}
      </div>
      <div className="subEvents-horizontal">
        {eventDetails.isMultiEvent && eventDetails.subEvents
          ? eventDetails.subEvents.map((sub, index) => {
              return (
                <SubEventCard
                  key={sub.subEventName}
                  subEvent={sub}
                  selectedSubEvent={selectedSubEvent}
                  index={index}
                  setSelectedSubEvent={setSelectedSubEvent}
                />
              );
            })
          : null}
      </div>
      <Expenditure
        expenditures={
          eventDetails.isMultiEvent
            ? eventDetails.subEvents[selectedSubEvent].expenditures
            : (eventDetails.expenditures
            ? eventDetails.expenditures
            : [])
        }
        onAddExp={onAddExpenditure}
        budgetInput={budgetInput}
        textFieldStyle={textFieldStyle}
        onExpChange={onExpChange}
        capitaliseFirstLetter={capitaliseFirstLetter}
        convertToRupeesFormat={convertToRupeesFormat}
        reverseRupeesFormat={reverseRupeesFormat}
        deleteExp={deleteExp}
      />
    </div>
  );
}

export default EventDetails;
