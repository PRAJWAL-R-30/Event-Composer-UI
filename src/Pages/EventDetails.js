import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./css/EventDetails.css";
import { useSelector, useDispatch } from "react-redux";
import SubEventCard from "../Components/SubEventCard";
import EventBasicDetails from "../Components/EventBasicDetails";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { reverseRupeesFormat } from "../Utils/utils";

import { budgetInput } from "../Utils/utils";

import {
  fetchEventDetails,
  updateBasicDetails,
  updateBudget,
} from "../Redux/Slices/EventDetailsSlice";

function EventDetails(props) {
  const { id } = useParams();

  const { eventDetails, isLoading, basicDetailsLoading, budgetLoading } = useSelector(
    (state) => state.eventDetails
  );

  const dispatch = useDispatch();

  const budgetInputRef = useRef();  

  const [isEditing, setIsEditing] = useState(false);
  const [isBudgetEditing, setIsBudgetEditing] = useState(false);
  const [basicDetails, setBasicDetails] = useState({});
  const [updatedBudget, setUpdatedBudget] = useState(0);

  useEffect(() => {
    console.log("useEffect running");
    dispatch(fetchEventDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if(isBudgetEditing) {
      budgetInputRef.current.focus()
    }
  }, [isBudgetEditing]);

  useEffect(() => {
    if (eventDetails) {
      console.log(eventDetails);
      setBasicDetails({
        eventName: eventDetails.eventName,
        eventType: eventDetails.eventType,
        eventDesc: eventDetails.eventDesc,
        eventDateTime: eventDetails.eventDateTime,
        eventVenue: eventDetails.eventVenue,
        isMultiEvent: eventDetails.isMultiEvent,
      });
      setUpdatedBudget(eventDetails.totalBudget);
    }
  }, [eventDetails]);

  const onEdit = () => {
    setIsEditing(true);
  };

  const saveBasicDetail = () => {
    dispatch(updateBasicDetails({ id: id, basicDetails: basicDetails }));
    setIsEditing(!isEditing);
    dispatch(fetchEventDetails(id));
  };

  const onCancelEdit = () => {
    setIsEditing(false);
  }

  const onBudgetEdit = () => {
    setIsBudgetEditing(true);
  };

  const saveBudgetEdit = () => {  
    dispatch(updateBudget({ id: id, budget: updatedBudget}))
    setIsBudgetEditing(false);
  }

  

  // const onAddExpenditure = () => {
  //   console.log("On Add expenditure");
  //   setEventDetails({
  //     ...eventDetails,
  //     expenditures: eventDetails.isMultiEvent
  //       ? [
  //           ...eventDetails.subEvents[selectedSubEvent].expenditures,
  //           expenditureObj
  //         ]
  //       : [...eventDetails.expenditures, expenditureObj]
  //   });
  // };

  // const onExpChange = (index, target, value) => {

  //   if (eventDetails.isMultiEvent) {
  //     const newEventDetails = { ...eventDetails };
  //     const expenditures = newEventDetails.subEvents[selectedSubEvent].expenditures;
  //     const updatedExpenditure = { ...expenditures[index], [target]: value };
  //     expenditures[index] = updatedExpenditure;
  //     setEventDetails(newEventDetails);
  //   }
  //   else{
  //     const expenditures = [...eventDetails.expenditures];
  //     expenditures[index] = { ...expenditures[index], [target]: value };
  //     setEventDetails({ ...eventDetails, expenditures });
  //   }
  //   console.log(eventDetails);

  // };

  // const deleteExp = (index) => {
  //   const expenditures = [...eventDetails.expenditures];
  //   expenditures.splice(index, 1);
  //   setEventDetails({ ...eventDetails, expenditures });
  // };

  if (!eventDetails) {
    return <></>;
  }

  return (
    <div className="event-details-page">
      {isLoading ? (
        <div className="spinner-flex">
          <CircularProgress />
        </div>
      ) : (
        <>
          <EventBasicDetails
            eventDetails={eventDetails}
            onEdit={onEdit}
            isEditing={isEditing}
            basicDetails={basicDetails}
            saveBasicDetail={saveBasicDetail}
            basicDetailsLoading={basicDetailsLoading}
            setBasicDetails={setBasicDetails}
            onCancelEdit={onCancelEdit}
          />
          <div className="budgetInput">
            {budgetInput(
              "Total Estimated Budget",
              updatedBudget,
              (e) => {
                setUpdatedBudget(reverseRupeesFormat(e.target.value));
              }, !isBudgetEditing,
              budgetInputRef
            )}
            {isBudgetEditing ? (
              <LoadingButton
                size="small"
                color="secondary"
                onClick={saveBudgetEdit}
                loading={budgetLoading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                className="NavButton save-button"
              >
                <span>Save</span>
              </LoadingButton>
            ) : (
              <EditIcon className="Pencil-Icon" onClick={onBudgetEdit} />
            )}
          </div>
          <div className="subEvents-horizontal">
            {eventDetails.isMultiEvent && eventDetails.subEvents
              ? eventDetails.subEvents.map((sub, index) => {
                  return (
                    <SubEventCard
                      key={sub.subEventName}
                      subEvent={sub}
                      index={index}
                    />
                  );
                })
              : null}
          </div>
        </>
      )}
    </div>
  );
}

export default EventDetails;
