import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import {
  Typography,
  Button,
  Box,
  Chip,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import axios from "axios";
import config from "../config";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const DocumentCollab = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [socket, setSocket] = useState(null);
  const [collabs, seCollabs] = useState([]);
  const [title, setTitle] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    const fetchDocument = async () => {
      try {
        const response = await axios.get(
          `${config.baseURL}/document/${documentId}`
        );
        setContent(response.data.content);
        console.log(response.data);
        seCollabs(response.data.collaborators);
        setTitle(response.data.title);
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchDocument();

    newSocket.emit("join-document", documentId);

    // Listen for changes from other users
    newSocket.on("receive-changes", (updatedContent) => {
      setContent(updatedContent.content);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [documentId]);

  const handleContentChange = (event) => {
    const newContent = event.target.value;
    setContent(newContent);
    // Emit the change to other clients
    socket.emit("edit-document", {
      documentId,
      content: newContent,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`${config.baseURL}/document/${documentId}`, { content });
      console.log("Document saved successfully");
    } catch (error) {
      console.error("Error saving document:", error);
    }
  };

  const handleGoBack = () => {
    navigate("/documents");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        margin: "2rem",
      }}
    >
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleGoBack}
            aria-label="go back"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Document - {title} - {documentId}
          </Typography>
          <Box>
            {collabs.map((collab) => (
              <Chip
                key={collab.userId}
                label={collab.userId}
                style={{ marginRight: "5px" }}
              />
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          backgroundColor: "#f1f3f4",
        }}
      >
        <Box
          sx={{
            width: "8.5in",
            minHeight: "11in",
            padding: 3,
            backgroundColor: "#fff",
            boxShadow: 2,
            borderRadius: 2,
            overflowY: "auto",
            maxHeight: "100%",
            border: "1px solid #e0e0e0",
          }}
        >
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Start typing here..."
            style={{
              width: "100%",
              height: "100%",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
              border: "none",
              outline: "none",
              resize: "none",
              padding: "0",
              margin: "0",
            }}
          />
        </Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        style={{ margin: "10px", alignSelf: "flex-end" }}
      >
        Save Document
      </Button>
    </div>
  );
};

export default DocumentCollab;
