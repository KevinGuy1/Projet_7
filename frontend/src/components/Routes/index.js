import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Connexion from "../../pages/Connexion";
import Navbar from "../Navbar";

const index = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/connexion" element={<Connexion />} />
        </Routes>
      </Router>
    </div>
  );
};

export default index;
