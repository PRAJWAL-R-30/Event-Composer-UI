import React from "react";
import "./css/Home.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Login from "./Login";
import Badge from "@mui/material/Badge";

//Material UI imports
import Button from "@mui/material/Button";

function Home() {
  const { user, userToken } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const navigateToCompose = () => {
    if (user) {
      navigate("/newEvent");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="homePage">
      <Grid container spacing={10} className="home-grid-container">
        <Grid item xs={4} className="home-grid-item">
          <img
            src="/images/home-collage.jpg"
            alt="Event Composer"
            className="home-collage"
          />
        </Grid>

        <Grid item xs={8} className="home-grid-item">
          <div className="text-container">
            <p className="big-font">Welcome to Incharge Event Composer</p>
            {userToken ? (
              <>
                <Button
                  variant="contained"
                  className="home-button"
                  onClick={navigateToCompose}
                >
                  Compose Event
                </Button>
                <Badge badgeContent={4} className="badge-button">
                  <Button
                    variant="contained"
                    className="home-button"
                    onClick={() => {
                      navigate("/myEvents");
                    }}
                  >
                    Your Events
                  </Button>
                </Badge>
                <Button
                  variant="contained"
                  className="home-button"
                  onClick={() => {
                    navigate("/myEvents");
                  }}
                >
                  Your Events
                </Button>
              </>
            ) : (
              <>
                <Login />
              </>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
