import React from "react";
import Cookies from 'js-cookie';

const Logout = () => {

  const logout = () => {
    Cookies.remove('token')
    console.log("cookie supprimé")
    window.location = "/connexion";
  }

  return (
    <li className="logout"><h5 onClick={logout}>Deconnexion</h5></li>
  );

};
export default Logout;
