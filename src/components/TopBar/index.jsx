import React, { useContext, useEffect, useState } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

import "./styles.css";
import { Link, Navigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
// import { AuthContext } from "../AuthContext";
import axios from "axios";

const cookies = new Cookies();

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = cookies.get("TOKEN");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await axios.get(
          `https://zpfnzn-8081.csb.app/api/user/${userId}`
        );
        // if (!response.ok) {
        //   throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        const userData = await response.data;
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (location.pathname.includes("/users/")) {
      const userId = location.pathname.split("/")[2];
      fetchUserData(userId);
    } else if (location.pathname.includes("/photos/")) {
      const userId = location.pathname.split("/")[2];
      fetchUserData(userId);
    }
  }, [location.pathname]);

  const logOut = () => {
    cookies.remove("TOKEN", { path: "/" });
    cookies.remove("_id", { path: "/" });
    cookies.remove("first_name", { path: "/" });
    window.location.href = "/login";
  };

  let contextText = "";
  if (userData) {
    contextText = location.pathname.includes("/users/")
      ? `Profile of ${userData.first_name} ${userData.last_name}`
      : `Photos of ${userData.first_name} ${userData.last_name}`;
  }
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        {isLoggedIn && (
          <>
            <Typography variant="h5" color="inherit">
              Welcome {cookies.get("first_name")}!
            </Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" style={{ marginRight: "20px" }}>
                {contextText}
              </Typography>
              <>
                <Button color="inherit" component={Link} to="/upload">
                  Add Photo
                </Button>
                <span> | </span>
                <Button color="inherit" onClick={logOut}>
                  Log Out
                </Button>
              </>
            </div>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Typography variant="h5" color="inherit">
              Please Login
            </Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" style={{ marginRight: "20px" }}>
                {contextText}
              </Typography>
              <>
                {location.pathname === "/login" && (
                  <Button color="inherit" component={Link} to="/register">
                    Register
                  </Button>
                )}
                {location.pathname === "/register" && (
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                )}
              </>
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
