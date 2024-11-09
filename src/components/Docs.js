import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
} from "@mui/material";
import config from "../config";

function DocumentList() {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userUUID");

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
  }, []);

  const handleDocumentClick = async (doc) => {
    const isCollaborator = doc.collaborators.some(
      (collab) => collab.userId === userId
    );

    if (!isCollaborator) {
      try {
        await axios.post(`${config.baseURL}/document/collaborators`, {
          documentId: doc.documentId,
          userId: userId,
        });
      } catch (error) {
        console.error("Failed to add collaborator:", error);
      }
    }
    navigate(`/documents/${doc.documentId}`);
  };

  return (
    <div style={{ margin: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Available Documents
      </Typography>
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
