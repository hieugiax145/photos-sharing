import React, { createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    _id: cookies.get("_id"),
    first_name: cookies.get("first_name"),
  });

  // useEffect(()=>{
  //   setUser({
  //     _id:cookies.get("_id"),
  //     firsr_name:cookies.get("first_name")
  //   });
  // })
  useEffect(() => {
    const token = cookies.get("TOKEN");
    if (token) {
      axios
        .get("https://gfn944-8081.csb.app/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data);
          // setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setUser(null);
          logOut();
        });
    }
  }, []);

  const logOut = () => {
    //
    cookies.remove("TOKEN", { path: "/" });
    cookies.remove("_id", { path: "/" });
    cookies.remove("first_name", { path: "/" });

    window.location.href = "/login";
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// export default AuthContext;
