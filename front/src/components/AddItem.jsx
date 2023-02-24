import React, { useState } from "react";
import {
  Button,
  Modal,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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

export default function InputModal({ open, onClose, product_type_id }) {
  const { user } = useAuth();
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [Serial_number, setSerial_number] = useState("");
  const [progress, setProgress] = useState(0);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSerial_numberChange = (event) => {
    setSerial_number(event.target.value);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_name", title);
    formData.append("serial_number", Serial_number);
    formData.append("product_type_id", product_type_id);

    try {
      // Make a POST request to the API endpoint to upload the file
      const response = await API.post("/items", formData, {
        onUploadProgress: (progressEvent) => {
          const progressPercentage = parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
          setProgress(progressPercentage);
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      // Handle the API response data
    } catch (error) {
      // Handle the error
    } finally {
      setTitle("");
      setSerial_number("");
      onClose();
      setProgress(0);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="input-modal-title"
      aria-describedby="input-modal-Serial_number"
      className={classes.modal}
    >
      <Box className={classes.paper}>
        <Typography variant="h6" id="input-modal-title" gutterBottom>
          Add Item
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mt={10}>
            <TextField
              label="name"
              variant="outlined"
              fullWidth
              value={title}
              onChange={handleTitleChange}
            />
          </Box>
          <br />
          <Box mt={20}>
            <TextField
              label="Serial number"
              variant="outlined"
              fullWidth
              value={Serial_number}
              onChange={handleSerial_numberChange}
            />
          </Box>
          <br />
          <br />
          <br />

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
