import React from "react";
import {
  CalendarMonth,
  AccessTime,
  LocationOn,
  CurrencyRupee,
} from "@mui/icons-material";
import { getDate, getTime } from "../Utils/utils";
import EditIcon from "@mui/icons-material/Edit";

function SubEventCard(props) {

  const selected = props.selectedSubEventId === props.subEvent._id;

  return (
    <div className={selected ?"card-selected subEvent-card":"subEvent-card"} onClick={()=>{ props.selectSubEvent() }}>
      <div className="card-header">
        <p>{props.subEvent.subEventName}</p>
      </div>
      <div className="card-body">
        <div className="body-item">
          <CalendarMonth className="card-icon" />
          <p>{getDate(props.subEvent.subEventDateTime)}</p>
        </div>
        <div className="body-item">
          <AccessTime className="card-icon" />
          <p>{getTime(props.subEvent.subEventDateTime)}</p>
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
      {selected ? 
      <div className="Edit-Card-Icon">
        <EditIcon onClick={props.editSubEvent} />
      </div> : null}  
      
    </div>
  );
}

export default SubEventCard;
