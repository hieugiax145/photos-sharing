import React, { useState, useContext } from "react";
import { Button, Typography, Container } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import Cookies from "universal-cookie";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../lib/firebase";
// import { storage } from '../../lib/firebase';

const cookies = new Cookies();

export default function Upload() {
  // const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [success, setSuccess] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload");
      return;
    }
    setUploading(true);
    setError(null);

    const imagefileRef = ref(
      storage,
      `users/${cookies.get("_id")}/${file.name}`
    );

    const uploadTask = uploadBytesResumable(imagefileRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          try {
            const token = cookies.get("TOKEN");
            await axios.post(
              "https://zpfnzn-8081.csb.app/api/photo/photos/new",
              {
                url,
                user_id: cookies.get("_id"),
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setUploading(false);
            setSuccess(true);
            setFile(null);
          } catch (err) {
            setError("Error saving photo URL");
            setUploading(false);
          }
        });
      }
    );
  };

  return (
    <Container>
      <Typography variant="h4">{imgUrl}</Typography>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        {filePreview && (
          <div style={{ marginTop: "20px" }}>
            <Typography variant="h6">Selected Photo:</Typography>
            <img
              src={filePreview}
              alt="Selected"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        )}
        {!imgUrl && (
          <div className="outerbar">
            <div className="innerbar" style={{ width: `${progresspercent}%` }}>
              {progresspercent}%
            </div>
          </div>
        )}
        {error && <Typography color="error">{error}</Typography>}
        {success && (
          <Typography color="primary">Photo uploaded successfully!</Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
        {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}
      </form>
    </Container>
  );
}
