import React, { useState, useContext } from "react";
import { TextField, Button, Paper, Typography, Grid } from "@mui/material";
import axios from "axios";
import "./styles.css";
import Cookies from "universal-cookie";
// import { AuthContext } from '../AuthContext';
const cookies = new Cookies();

function Register() {
  const [login_name, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCf, setPasswordCf] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [occupation, setOccupation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "https://zpfnzn-8081.csb.app/api/user/user",
        {
          login_name,
          password,
          passwordCf,
          first_name,
          last_name,
          location,
          description,
          occupation,
        }
      );

      cookies.set("TOKEN", result.data.token, {
        path: "/",
      });

      cookies.set("_id", result.data._id, {
        path: "/",
      });

      cookies.set("first_name", result.data.first_name, {
        path: "/",
      });

      window.location.href = "/";
      setError(result.data.message);
    } catch (error) {
      setError(error.response.data.msg);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={"mainContainer"}>
        <div className={"titleContainer"}>
          <div>Register</div>
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            value={login_name}
            placeholder="Enter your login name"
            onChange={(e) => setLoginName(e.target.value)}
            className={"inputBox"}
            required
          />
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className={"inputBox"}
            required
          />
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            type="password"
            value={passwordCf}
            placeholder="Confirm your password"
            onChange={(e) => setPasswordCf(e.target.value)}
            className={"inputBox"}
            required
          />
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            value={first_name}
            placeholder="Enter your first name"
            onChange={(e) => setFirstName(e.target.value)}
            className={"inputBox"}
            required
          />
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            value={last_name}
            placeholder="Enter your last name"
            onChange={(e) => setLastName(e.target.value)}
            className={"inputBox"}
            required
          />
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            value={location}
            placeholder="Enter your location"
            onChange={(e) => setLocation(e.target.value)}
            className={"inputBox"}
          />
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            value={description}
            placeholder="Enter your description"
            onChange={(e) => setDescription(e.target.value)}
            className={"inputBox"}
          />
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            value={occupation}
            placeholder="Enter your ocupation"
            onChange={(e) => setOccupation(e.target.value)}
            className={"inputBox"}
          />
        </div>
        {/* <br /> */}
        <p className="errorLabel">{error}</p>
        <Button type="submit" variant="contained" color="primary">
          Register Me
        </Button>
      </div>
    </form>
  );
}

export default Register;
