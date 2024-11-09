import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./components/StartPage";
import DocsPage from "./components/Docs";
import DocumentCollab from "./components/DocumentCollab";

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
