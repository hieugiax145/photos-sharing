import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import "./styles.css";
import { Link, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
// import { AuthContext } from '../AuthContext';
const cookies = new Cookies();

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const [user, setUser] = useState("");
  const [photos, setPhotos] = useState([]);
  const [newComment, setNewComment] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(
          `https://zpfnzn-8081.csb.app/api/user/${userId}`
        );
        const userData = await userResponse.data;
        setUser(userData);
        console.log(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchPhotos = async () => {
      try {
        const photosResponse = await axios.get(
          `https://zpfnzn-8081.csb.app/api/photo/photosOfUser/${userId}`
        );
        const photosData = await photosResponse.data;
        setPhotos(photosData);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchUserData();
    fetchPhotos();
  }, [userId]);

  const handleCommentChange = (photoId, comment) => {
    setNewComment({ ...newComment, [photoId]: comment });
  };

  const handleCommentSubmit = async (photoId) => {
    const comment = newComment[photoId];
    if (!comment) return;

    try {
      const response = await axios.post(
        `https://zpfnzn-8081.csb.app/api/photo/commentsOfPhoto/${photoId}`,
        {
          userId: cookies.get("_id"),
          comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) console.log("done");
      const updatedPhoto = await response.data;
      setPhotos(
        photos.map((photo) =>
          photo._id === updatedPhoto._id ? updatedPhoto : photo
        )
      );
      setNewComment({ ...newComment, [photoId]: "" });
    } catch (error) {
      setError("Error adding comment:", error);
    }
  };

  const { _id, first_name, last_name } = user;
  return (
    <>
      {user && (
        <Typography variant="h4" gutterBottom>
          Photos of {first_name} {last_name}
        </Typography>
      )}

      {photos.map((photo) => (
        <Card key={photo._id} style={{ marginBottom: "10px" }}>
          <CardMedia
            className="photo"
            component="img"
            image={`${photo.url}`}
            alt={photo.file_name}
          />

          <CardContent>
            <Typography variant="caption">
              Date: {new Date(photo.date_time).toLocaleString()}{" "}
              {Date().toLocaleString()}
            </Typography>
            <Typography variant="body1">Comments:</Typography>

            {photo.comments && photo.comments.length > 0 ? (
              photo.comments.map((comment) => (
                <Typography
                  className="comment-box"
                  variant="body2"
                  key={comment._id}
                  gutterBottom
                >
                  <div className="comment-head">
                    <Typography className="comment-author" variant="subtitle1">
                      <Link to={`/users/${comment.user_id._id}`}>
                        {comment.user_id.first_name} {comment.user_id.last_name}{" "}
                      </Link>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(comment.date_time).toLocaleString()}
                      </Typography>
                    </Typography>
                  </div>
                  <Typography variant="body2">{comment.comment}</Typography>
                </Typography>
              ))
            ) : (
              <Typography variant="body2" gutterBottom>
                No comments
              </Typography>
            )}
            <Input
              disableUnderline="true"
              placeholder="Add a comment"
              fullWidth
              onChange={(e) => handleCommentChange(photo._id, e.target.value)}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              className="button"
              variant="contained"
              color="primary"
              onClick={() => handleCommentSubmit(photo._id)}
              style={{ marginTop: "10px", borderRadius: "12px" }}
            >
              Send
            </Button>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default UserPhotos;
