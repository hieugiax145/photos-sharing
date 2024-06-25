import "./App.css";

import React, { useState } from "react";
import { Grid, Typography, Paper, Container } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import Login from "./components/Login";
// import AuthCompontnt from "./components/AuthConponents";
import ProtectedRoute from "./components/ProtectedRoute";
import Upload from "./components/Upload";
import Register from "./components/Register";

const AppLayout = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TopBar />
        </Grid>
        <div className="main-topbar-buffer" />
        {isAuthPage ? (
          <Container className="main" maxWidth>
            <div>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </Container>
        ) : (
          <>
            <Grid item sm={3}>
              <Paper className="main-grid-item">
                <ProtectedRoute><UserList /></ProtectedRoute>
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className="main-grid-item">
                <Routes>
                  {/* <Route path="/auth" element={<AuthCompontnt />} /> */}

                  <Route
                    path="/upload"
                    element={
                      <ProtectedRoute>
                        <Upload />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/users/:userId"
                    element={
                      <ProtectedRoute>
                        <UserDetail />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/photos/:userId"
                    element={
                      <ProtectedRoute>
                        <UserPhotos />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/users"
                    element={
                      <ProtectedRoute>
                        <UserList />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Paper>
            </Grid>
            {/* // </Grid></Grid> */}
          </>
        )}
      </Grid>
    </div>
  );
};

const App = (props) => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
