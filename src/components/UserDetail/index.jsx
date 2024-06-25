import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";

import "./styles.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://zpfnzn-8081.csb.app/api/user/${userId}`
        );
        // if (!response.ok) {
        //   throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        const userData = await response.data;
        setUser({
          _id: userData._id,
          first_name: userData.first_name,
          last_name: userData.last_name,
          location: userData.location,
          description: userData.description,
          occupation: userData.occupation,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userId]);

  // const { first_name, last_name, location, description, occupation } = user;
  return (
    <>
      <Typography variant="h4" gutterBottom>
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Location: {user.location}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Occupation: {user.occupation}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Description: {user.description}
      </Typography>
      <Button component={Link} to={`/photos/${userId}`} color="primary">
        View All Photos
      </Button>
    </>
  );
}

export default UserDetail;
