import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./components/StartPage";
import DocsPage from "./components/Docs";

const App = () => {
  return (
    <Router>
      <header>
        <h1>Welcome to Collaboration</h1>{" "}
      </header>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/docs" element={<DocsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
