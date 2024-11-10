import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import config from "../config";
import { blue } from "@mui/material/colors";

function DocumentList() {
  const [documents, setDocuments] = useState([]);
  const [newDocTitle, setNewDocTitle] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userUUID");
  const userName = localStorage.getItem("userName");
  const [refreshDocuments, setRefreshDocuments] = useState(false);
  

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`${config.baseURL}/document/all`);
        setDocuments(response.data);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      }
    };

    fetchDocuments();
  }, [refreshDocuments]);

  const handleDocumentClick = async (doc) => {
    const isCollaborator = doc.collaborators.some(
      (collab) => collab.userId === userId
    );

    if (!isCollaborator) {
      try {
        await axios.put(`${config.baseURL}/document/collaborators`, {
          documentId: doc.documentId,
          userId: userId,
        });
      } catch (error) {
        console.error("Failed to add collaborator:", error);
      }
    }
    navigate(`/documents/${doc.documentId}`);
  };

  const handleCreateDocument = async () => {
    if (!newDocTitle) {
      return;
    }

    try {
      await axios.post(`${config.baseURL}/document/create`, {
        title: newDocTitle,
        ownerId: userId,
      });

      setRefreshDocuments((prev) => !prev);
      setNewDocTitle("");
      setOpenDialog(false);
    } catch (error) {
      console.error("Failed to create document:", error);
    }
  };

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div style={{ margin: "2rem" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDialogOpen}
        style={{ marginBottom: "2rem" }}
      >
        Create New Document
      </Button>
      <IconButton onClick={handleHomeClick} style={{ marginBottom: '2rem', marginLeft: '2rem' }}>
        <HomeIcon sx={{ color: 'primary.main' }} /> <p style={{marginLeft: '.5rem', fontSize: '1rem'}}>Home</p>
      </IconButton>

      <Typography variant="h4" gutterBottom>
        Available Documents - <span style={{ color: blue }}>Hi {userName}</span>
      </Typography>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Create New Document</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Document Title"
            fullWidth
            variant="outlined"
            value={newDocTitle}
            onChange={(e) => setNewDocTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateDocument} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={2}>
        {documents.map((doc) => (
          <Grid item xs={12} sm={6} md={4} key={doc.documentId}>
            <Card onClick={() => handleDocumentClick(doc)}>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {doc.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Owner: {doc.owner.username}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Collaborators:{" "}
                    {doc.collaborators.map((c) => c.username).join(", ")}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default DocumentList;
