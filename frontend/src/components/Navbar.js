import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
  const uid = useContext(UidContext);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact to="/">
            <div className="logo">
              <img
                src="./Groupomania Logos/icon-left-font.png"
                alt="logo Groupomania"
              />
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li className="welcome">
              <h5>Bienvenue !</h5>
            </li>
            <Logout />
          </ul>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
