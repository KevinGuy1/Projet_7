import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Log/Logout";
import { useStore } from "./Store";

const Navbar = () => {
  const token = useStore((state) => state.token);

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
        {token
          // Si token afficher bienvenue et deco sinon null
          ? (
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
