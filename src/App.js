  import './App.css';
import {Routes, Route, Link, Router } from 'react-router-dom';

import MenuBar from './Components/Menubar';
import Home from './Pages/Home'
import NewEvent from './Pages/NewEvent';
import MyEvents from './Pages/MyEvents';
import EventDetails from './Pages/EventDetails';
import Login from './Pages/Login';

function App() {
  return (
    <div className="App">
      <MenuBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route exact path="/NewEvent" element={<NewEvent />} />
        <Route exact path="/MyEvents" element={<MyEvents />} />
        <Route exact path="/MyEvents/:id" element={<EventDetails />} />
      </Routes>
        
    </div>
  );
}

export default App;
