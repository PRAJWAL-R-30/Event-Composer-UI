import { useEffect } from 'react';
import "./App.css";
import { Routes, Route } from "react-router-dom";

import MenuBar from "./Components/Menubar";
import Home from "./Pages/Home";
import NewEvent from "./Pages/NewEvent";
import MyEvents from "./Pages/MyEvents";
import EventDetails from "./Pages/EventDetails";
import Login from "./Pages/Login";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "./Components/PrivateRoute";
import { getUserDetails } from './Redux/Slices/UserSlice'

function App() {
  const { user, userToken } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userToken && !user) {
      dispatch(getUserDetails());
    }
  }, [dispatch, user, userToken]);
  
  return (
    <div className="App">
      <MenuBar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />

        <Route
          path="/NewEvent"
          element={<PrivateRoute element={NewEvent} />}
        />
        <Route
          path="/MyEvents" exact
          element={<PrivateRoute element={MyEvents} />}
        />
        <Route
          path="/MyEvents/:id" exact
          element={<PrivateRoute element={EventDetails} />}
        />
      </Routes>
    </div>
  );
}

export default App;
