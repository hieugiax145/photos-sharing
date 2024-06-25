import React, { useState, useContext } from "react";
import { TextField, Button, Paper, Typography, Grid } from "@mui/material";
import axios from "axios";
import "./styles.css";
import Cookies from "universal-cookie";
// import { AuthContext } from '../AuthContext';
const cookies = new Cookies();

function Login() {
  const [login_name, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "https://zpfnzn-8081.csb.app/admin/login",
        { login_name, password }
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
    } catch (error) {
      setError(error.response.data.msg);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={"mainContainer"}>
        <div className={"titleContainer"}>
          <div>Login</div>
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
            placeholder="Enter your password here"
            onChange={(e) => setPassword(e.target.value)}
            className={"inputBox"}
            required
          />
        </div>
        {/* <br /> */}
        <p className="errorLabel">{error}</p>
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </div>
    </form>
  );
}

export default Login;
