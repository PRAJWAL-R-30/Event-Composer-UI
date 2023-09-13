import React, {useState, useEffect, useCallback} from "react";
import "./css/Menubar.css";
import { useNavigate } from "react-router-dom";

//Material UI imports
import Button from "@mui/material/Button";


function MenuBar({user}) {
  const navigate = useNavigate();

  const getUserInitials = useCallback(() => {
    if (user){
      return user.firstName.charAt(0).concat(user.lastName.trim() ? user.lastName.charAt(0): ""); 
    }
    return null;
  }, [user]);

  const [userInitials, setUserInitials] = useState("");

  useEffect(() => {
    setUserInitials(getUserInitials())
  }, [user, getUserInitials]);

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
    // {
    //   name: "Login",
    //   style: "contained",
    //   show: !user,
    //   navLink: "/Login",
    // },
    {
      name: userInitials,
      style: "avatar",
      show: user,
      navLink: "",
    }
  ];
  
  return (
    <div className="menubar">
      <div className="header-logo" onClick={() => {
            navigate("/");
          }}>
        <img
          alt="Incharge"
          src="/logos/logo-color-transparent.png"
        />
      </div>
      <div className="menu-items">
        {menuItems
          .filter((item) => item.show)
          .map((item) => (
            <Button key={item.name} className={item.style} onClick={() => navigate(item.navLink)}>
              {item.name}
            </Button>
          ))}
      </div>
    </div>
  );
}

export default MenuBar;
