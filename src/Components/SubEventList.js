import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SubEventCard from "./SubEventCard";
import EditSubEvent from "../Modals/EditSubEventModal";
import {
  getAllSubEvents,
  updateSubEvent,
} from "../Redux/Slices/SubEventsSlice";

import Button from "@mui/material/Button";
import { Save, NavigateNext, NavigateBefore } from "@mui/icons-material";

function SubEventslist(props) {
  const cardScrollRef = useRef();

  const { subEvents, isLoading, updateLoading } = useSelector(
    (state) => state.subEvents
  );

  const [cardScrollX, setCardScrollX] = useState(0);
  const [cardScrollEnd, setCardScrollEnd] = useState(false);
  const [openEditSubevent, setOpenEditSubEvent] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSubEvents(props.eventId));
  }, [dispatch, props.eventId]);

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

  const saveSubEvent = (subEvent) => {
    dispatch(updateSubEvent(subEvent));
    closeEditSubEvent();
    dispatch(getAllSubEvents(props.eventId));
  };

  return (
    <div className="subEvents-horizontal">
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
        {subEvents
          ? subEvents
              .slice() // Create a shallow copy of subEvents to avoid mutating the original array
              .sort((a, b) => {
                // Assuming subEventDateTime is a string in ISO8601 format, you can convert it to Date objects for comparison
                const dateA = new Date(a.subEventDateTime);
                const dateB = new Date(b.subEventDateTime);

                return dateA - dateB; // Sort in ascending order, use dateB - dateA for descending
              })
              .map((sub, index) => {
                return (
                  <SubEventCard
                    key={sub._id}
                    subEvent={sub}
                    selectedSubEventId={props.selectedSubEventId}
                    selectSubEvent={() => {
                      props.setSelectedSubEventId(sub._id);
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
      <EditSubEvent
        open={openEditSubevent}
        onClose={closeEditSubEvent}
        subEvent={
          subEvents.filter((sub) => sub?._id === props.selectedSubEventId)[0]
        }
        saveSubEvent={(subEvent) => {
          saveSubEvent(subEvent);
        }}
        selectedSubEventId={props.selectedSubEventId}
        isLoading={updateLoading}
      />
    </div>
  );
}

export default SubEventslist;
