import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Log/Logout";
import Cookies from 'js-cookie';
// import { userStore } from "./Store";


const Navbar = () => {
  const token = Cookies.get('token');
  const pseudo = Cookies.get('pseudo');

  // const pseudo = userStore((state) => state.pseudo);


  return (
    <nav className="fixed w-full h-12 rounded shadow-sm shadow-primary after:backdrop-blur after:abolute after:h-12 after:w-full after: after:top-0 " >
      <div className="flex justify-between h-12 ">
        <div className="">
          <NavLink exact to="/">
            <div>
              <img
                className="h-12 w-64 object-cover"
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
                <h5>Bienvenue {pseudo} !!</h5>
              </li>
              <Logout />
            </ul>
          ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
