import React from "react";
import Log from "../components/Log";

const Connexion = () => {
  return (
    <div className="connexion-page">
      <div className="log-container">
        <Log login={false} signup={true} />
      </div>
    </div>
  );
};

export default Connexion;
