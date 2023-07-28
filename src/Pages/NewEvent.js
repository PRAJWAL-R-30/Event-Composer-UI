import React from "react";
import './css/NewEvent.css'

import NewEventForm from "../Components/NewEventForm";

function NewEvent() {
    return (
        <div className="NewEvent">
            <div className="newEvent-title">
                Start Composing Your Event
            </div> 
            <NewEventForm />
        </div>
    );
}

export default NewEvent;