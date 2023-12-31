import React from "react";
import "./css/Home.css";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

//Material UI imports
import Button from "@mui/material/Button";

function Home() {

  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const navigateToCompose = () => {
    if (user){
      navigate('/newEvent');
    }
    else {
      navigate('/login');
    }
  };

  return (
    <div className="homePage">
      <img src="/illustrations/eventplan-illustration.png" alt="Event Composer" />
      <div className="text-container">
        <p className="big-font">Hi there!</p>
        <p className="medium-font">
          Do you have an upcoming event and you are <strong>in charge</strong>{" "}
          of planning the event? You are in right place, place where you can
          save your time and energy and compose a best event. Plan Budget,
          Expenditure, Decorations, Notes, Reminders … explore more and more.
          Start Planning your first event. Good luck Mr.Incharge.
        </p>
        <Button variant="contained" className="create-button" onClick={navigateToCompose}>
          Compose Event
        </Button>
      </div>
    </div>
  );
}

export default Home;
