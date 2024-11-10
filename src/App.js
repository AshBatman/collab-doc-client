import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import DocsPage from "./pages/Docs";
import DocumentCollab from "./pages/DocumentCollab";

const App = () => {
  return (
    <Router>
      <header>
        <h1 style={{margin: '2rem'}}>Welcome to Collaboration</h1>{" "}
      </header>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/documents" element={<DocsPage />} />
        <Route path="/documents/:documentId" element={<DocumentCollab />} />
      </Routes>
    </Router>
  );
};

export default App;
