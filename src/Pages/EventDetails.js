import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./css/EventDetails.css";
import { useSelector, useDispatch } from "react-redux";
import SubEventCard from "../Components/SubEventCard";
import EventBasicDetails from "../Components/EventBasicDetails";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import LoadingButton from "@mui/lab/LoadingButton";
import { Save, NavigateNext, NavigateBefore } from "@mui/icons-material";
import { reverseRupeesFormat } from "../Utils/utils";
import Button from "@mui/material/Button";
import EditSubEvent from "../Modals/EditSubEventModal";
import SubEventsList from "../Components/SubEventList";

import { budgetInput } from "../Utils/utils";

import {
  fetchEventDetails,
  updateBasicDetails,
  updateBudget,
} from "../Redux/Slices/EventDetailsSlice";

function EventDetails(props) {
  const { id } = useParams();

  const { eventDetails, isLoading, basicDetailsLoading, budgetLoading } =
    useSelector((state) => state.eventDetails);

  const dispatch = useDispatch();

  const budgetInputRef = useRef();
  const cardScrollRef = useRef();

  const [isEditing, setIsEditing] = useState(false);
  const [isBudgetEditing, setIsBudgetEditing] = useState(false);
  const [basicDetails, setBasicDetails] = useState({});
  const [updatedBudget, setUpdatedBudget] = useState(0);

  const [selectedSubEventId, setSelectedSubEventId] = useState();

  const [openEditSubevent, setOpenEditSubEvent] = useState(false);

  const [cardScrollX, setCardScrollX] = useState(0);
  const [cardScrollEnd, setCardScrollEnd] = useState(false);

  useEffect(() => {
    dispatch(fetchEventDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (isBudgetEditing) {
      budgetInputRef.current.focus();
    }
  }, [isBudgetEditing]);

  useEffect(() => {
    if (eventDetails) {
      setBasicDetails({
        eventName: eventDetails.eventName,
        eventType: eventDetails.eventType,
        eventDesc: eventDetails.eventDesc,
        eventDateTime: eventDetails.eventDateTime,
        eventVenue: eventDetails.eventVenue,
        isMultiEvent: eventDetails.isMultiEvent,
      });
      setUpdatedBudget(eventDetails.totalBudget);

      if (eventDetails.isMultiEvent) {
        setSelectedSubEventId(eventDetails.subEvents[0]._id);
      }
    }
  }, [eventDetails]);

  useEffect(() => {
    if (cardScrollRef && cardScrollRef.current) {
      scrollCheck();
    }
  });

  const slide = (shift) => {
    cardScrollRef.current.scrollLeft += shift;
    setCardScrollX(cardScrollX + shift);

    if (
      Math.floor(
        cardScrollRef.current.scrollWidth - cardScrollRef.current.scrollLeft
      ) <= cardScrollRef.current.offsetWidth
    ) {
      setCardScrollEnd(true);
    } else {
      setCardScrollEnd(false);
    }
  };

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
  };

  const onBudgetEdit = () => {
    setIsBudgetEditing(true);
  };

  const saveBudgetEdit = () => {
    dispatch(updateBudget({ id: id, budget: updatedBudget }));
    setIsBudgetEditing(false);
  };

  const scrollCheck = () => {
    setCardScrollX(cardScrollRef.current.scrollLeft);
    if (
      Math.floor(
        cardScrollRef.current.scrollWidth - cardScrollRef.current.scrollLeft
      ) <= cardScrollRef.current.offsetWidth
    ) {
      setCardScrollEnd(true);
    } else {
      setCardScrollEnd(false);
    }
  };

  const onEditSubEvent = () => {
    setOpenEditSubEvent(true);
  };

  const closeEditSubEvent = () => {
    setOpenEditSubEvent(false);
  };

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
              },
              !isBudgetEditing,
              budgetInputRef
            )}
            {isBudgetEditing ? (
              <LoadingButton
                size="small"
                color="secondary"
                onClick={saveBudgetEdit}
                loading={budgetLoading}
                loadingPosition="start"
                startIcon={<Save />}
                variant="contained"
                className="NavButton save-button"
              >
                <span>Save</span>
              </LoadingButton>
            ) : (
              <EditIcon className="Pencil-Icon" onClick={onBudgetEdit} />
            )}
          </div>
          {/* <div className="subEvents-horizontal">
            {cardScrollX !== 0 ? (
              <Button
                className="scroll-button"
                variant="contained"
                onClick={() => slide(-200)}
              >
                <NavigateBefore />
              </Button>
            ) : null}

            <ol ref={cardScrollRef} className="cards-ul" onScroll={scrollCheck}>
              {eventDetails.isMultiEvent && eventDetails.subEvents
                ? eventDetails.subEvents.map((sub, index) => {
                    return (
                      <SubEventCard
                        key={sub._id}
                        subEvent={sub}
                        selectedSubEventId={selectedSubEventId}
                        selectSubEvent={() => {
                          setSelectedSubEventId(sub._id);
                        }}
                        editSubEvent={() => {
                          onEditSubEvent();
                        }}
                      />
                    );
                  })
                : null}
            </ol>
            {!cardScrollEnd ? (
              <Button
                className="scroll-button"
                variant="contained"
                onClick={() => slide(200)}
              >
                <NavigateNext />
              </Button>
            ) : null}
          </div> */}
          <SubEventsList
            selectedSubEventId={selectedSubEventId}
            setSelectedSubEventId={setSelectedSubEventId}
            eventId={eventDetails._id}
          />
        </>
      )}
      <EditSubEvent
        open={openEditSubevent}
        onClose={closeEditSubEvent}
        subEvent={
          eventDetails.subEvents.filter(
            (sub) => sub?._id === selectedSubEventId
          )[0]
        }
      />
    </div>
  );
}

export default EventDetails;
