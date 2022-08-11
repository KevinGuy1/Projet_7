import React from "react";
import Cookies from 'js-cookie';

const Logout = () => {

  const logout = () => {
    Cookies.remove('token')
    console.log("cookie supprimé")
    window.location = "/connexion";
  }

  return (
    <li onClick={logout}>
      <h5>Deconnexion</h5>
    </li>
  );

};
export default Logout;
