import React from "react";
import "./css/Menubar.css";
import { Link, useNavigate } from "react-router-dom";

//Material UI imports
import Button from "@mui/material/Button";


function MenuBar() {
  const navigate = useNavigate();
  //const menuItems = ["home", "New Event", "My Events", "LogIn", "SignUp"];
  const menuItems = [
    {
      name: "Home",
      style: "text",
      show: true,
      navLink: "/",
    },
    {
      name: "New Event",
      style: "text",
      show: true,
      navLink: "/NewEvent",
    },
    {
      name: "My Events",
      style: "text",
      show: true,
      navLink: "/MyEvents",
    },
    // {
    //   name: "LogIn",
    //   style: "text",
    //   show: true,
    //   navLink: "/Login",
    // },
    {
      name: "Login",
      style: "contained",
      show: true,
      navLink: "/Login",
    },
  ];
  return (
    <div className="menubar">
      <div className="header-logo" onClick={() => {
            navigate("/");
          }}>
        <img
          
          src="/logos/logo-color-transparent.png"
        />
      </div>
      <div className="menu-items">
        {menuItems
          .filter((item) => item.show == true)
          .map((item) => (
            <Button key={item.name} className={item.style} href={item.navLink}>
              {item.name}
            </Button>
          ))}
      </div>
    </div>
  );
}

export default MenuBar;
