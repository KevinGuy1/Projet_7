import React from "react";
import Cookies from 'js-cookie';

const Logout = () => {

  const logout = () => {
    Cookies.remove('token')
    Cookies.remove('pseudo')
    Cookies.remove('role')
    Cookies.remove('userId')
    console.log("cookie supprimé")
    window.location = "/connexion";
  }

  return (
    <li className="px-3 cursor-pointer hover:scale-105 hover:duration-100"><h5 onClick={logout}>Deconnexion</h5></li>
  );

};
export default Logout;
