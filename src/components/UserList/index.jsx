import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import "./styles.css";
import models from "../../modelData/models";
import { Link } from "react-router-dom";
import axios from "axios";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://zpfnzn-8081.csb.app/api/user/list"
        );
        // if (!response.ok) {
        //   throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        const result = await response.data;
        setUsers(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching the data.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {/* <Typography variant="body1">
          This is the user list, which takes up 3/12 of the window. You might
          choose to use <a href="https://mui.com/components/lists/">Lists</a>{" "}
          and <a href="https://mui.com/components/dividers/">Dividers</a> to
          display your users like so:
        </Typography> */}
      <List component="nav">
        {users.map((item) => (
          <>
            <ListItem button component={Link} to={`users/${item._id}`}>
              <ListItemText primary={item.first_name} />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
      {/* <Typography variant="body1">
          The model comes in from models.userListModel()
        </Typography> */}
    </div>
  );
}

export default UserList;
