import React, { useState } from "react";
import {
  Button,
  Modal,
  TextField,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import API from "../utils/API";
import { useAuth } from "../hooks/useAuth";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[0],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "4px",
    width: "500px",
    maxWidth: "95%",
  },
  input: {
    display: "none",
  },
  preview: {
    maxWidth: "100%",
    maxHeight: "200px",
  },
}));

export default function InputModal({ open, onClose }) {
  const { user } = useAuth();
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleClearImage = () => {
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("name", title);
    formData.append("description", description);

    try {
      // Make a POST request to the API endpoint to upload the file
      const response = await API.post("/proudct_types", formData, {
        onUploadProgress: (progressEvent) => {
          const progressPercentage = parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
          setProgress(progressPercentage);
        },
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      // Handle the API response data
    } catch (error) {
      // Handle the error
    } finally {
      setTitle("");
      setDescription("");
      setImage(null);
      onClose();
      setProgress(0);
      setImage(null);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="input-modal-title"
      aria-describedby="input-modal-description"
      className={classes.modal}
    >
      <Box className={classes.paper}>
        <Typography variant="h6" id="input-modal-title" gutterBottom>
          Add Type
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mt={10}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={handleTitleChange}
            />
          </Box>
          <br />
          <Box mt={20}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
            />
          </Box>
          <Box my={2}>
            <input
              accept="image/*"
              className={classes.input}
              id="input-image"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="input-image">
              <IconButton
                color="primary"
                aria-label="upload image"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
            {image && (
              <Box mt={2}>
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className={classes.preview}
                />
                <Box textAlign="center" mt={1}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleClearImage}
                  >
                    Clear Image
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
          <Box textAlign="right">
            <Button onClick={onClose} style={{ marginRight: "1rem" }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
            {progress > 0 && (
              <CircularProgress
                style={{ color: "red" }}
                variant="determinate"
                value={progress}
              />
            )}
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
