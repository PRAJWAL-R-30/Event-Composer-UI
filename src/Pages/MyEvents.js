import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./css/MyEvents.css";
import { useSelector, useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteAll, fetchEvents } from '../Redux/Slices/EventsSlice';

function MyEvents() {

  const navigate = useNavigate();

  const { events, isLoading } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect (() => {
    dispatch(fetchEvents())
  }, [dispatch]);

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }

  const formatter = new Intl.NumberFormat("en-IN");

  const convertToRupeesFormat = (amount) => {
    const rawValue = amount.replace(/[^\d.-]/g, "");
    if (amount === "") {
      return 0;
    } else {
      return formatter.format(parseFloat(rawValue));
    }
  };

  const getDate = (date) => {
    let dateObj = new Date(date);
    const dateString = dateObj.toDateString();
    return dateString;  
  }

  const getTime = (date) => {
    let dateObj = new Date(date);
    const timeString = dateObj.toLocaleTimeString('en-US', timeOptions);
    return timeString;
  }

  const goToDetails = (id) => { 
    console.log(id);
    navigate(`/MyEvents/${id}`);
  }

  return (
    <div className="my-events">
      <div className="myEvent-title">All Your Events</div>
      <div className="all-events">
        {events.map((item) => (
          <div key={item._id} 
            className='event-list-item'
            onClick={() => goToDetails(item.id)}>
            <div className="item-top-row">
                <p className="event-title">{item.eventName}</p>
                <div className="date-time">
                  { item.isMultiEvent ? <p className="event-date">(Multi Event)</p> : <>
                    <p className="event-date">{getDate(item.eventDateTime)}</p>
                    <p className="event-date">{getTime(item.eventDateTime)}</p>
                    </>
                  }
                </div>
                
                <p className="total-budget">
                    Total Budget: <span>&#8377;</span>{convertToRupeesFormat(item.totalBudget.toString())}
                </p>
            </div>
            <div className="item-bottom-row">
                <p className="event-desc">{item.eventDesc}</p>
            </div>
            
            
          </div>
        ))}
      </div>
      {events.length > 0 ? 
      <div className="Edit-button">
      <LoadingButton
        size="small"
        color="secondary"
        onClick={() => {
          dispatch(deleteAll())
        }}
        loading={isLoading}
        loadingPosition="start"
        startIcon={<DeleteIcon />}
        variant="contained"
        className="NavButton deleteButton"
      >
        <span>Delete All</span>
      </LoadingButton>
    </div> : <></>}
      
    </div>
  );
}

export default MyEvents;
