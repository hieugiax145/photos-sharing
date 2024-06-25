import { Button } from "@mui/material";
import React, { useContext } from "react";
import Cookies from "universal-cookie";
import { AuthContext } from "../AuthContext";

const cookies = new Cookies();

export default function AuthComponent() {
  const { user, setUser } = useContext(AuthContext);
  const handleSubmit = () => {
    setUser({
      _id: "1",
      first_name: "hieu",
    });
    console.log(user);
  };
  return (
    <div>
      <h1 className="text-center">{user ? user.first_name : "helo"}</h1>
      <h1>{user ? user.first_name : "helo"}</h1>
      <Button type="submit" color="primary" onClick={() => handleSubmit()}>
        Sign Out
      </Button>
    </div>
  );
}
