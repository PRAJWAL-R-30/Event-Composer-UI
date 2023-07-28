import React from "react";
import {
  CalendarMonth,
  AccessTime,
  LocationOn,
  CurrencyRupee,
} from "@mui/icons-material";
import { getDate, getTime } from "../Utils/utils";

function SubEventCard(props) {
  return (
    <div className={props.selectedSubEvent===props.index?"card-selected subEvent-card":"subEvent-card"} onClick={()=>{
        props.setSelectedSubEvent(props.index)}}>
      <div className="card-header">
        <p>{props.subEvent.subEventName}</p>
      </div>
      <div className="card-body">
        <div className="body-item">
          <CalendarMonth className="card-icon" />
          <p>{getDate(props.subEvent.subEventDate)}</p>
        </div>
        <div className="body-item">
          <AccessTime className="card-icon" />
          <p>{getTime(props.subEvent.subEventDate)}</p>
        </div>
        <div className="body-item">
          <LocationOn className="card-icon" />
          <p>{props.subEvent.subEventVenue}</p>
        </div>
        <div className="body-item">
          <CurrencyRupee className="card-icon" />
          <p>{props.subEvent.estimatedBudget}</p>
        </div>
      </div>
    </div>
  );
}

export default SubEventCard;
