import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [loginModal, setLoginModal] = useState(props.login);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setLoginModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setLoginModal(true);
    }
  };

  return (
    <div className="w-full pt-20">
      <div className="flex m-auto max-w-[450px] min-w-[360px] bg-secondary rounded-2xl shadow-secondary shadow-md">
        <ul className="w-1/3 px-5 py-4">
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? "bg-primary text-secondary rounded-xl mb-6 text-center px-2 shadow-primary shadow-sm" : "mb-6 text-center px-2"}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={loginModal ? "bg-primary text-secondary rounded-xl text-center px-2 shadow-primary shadow-sm" : "text-center px-2 "}
          >
            Se connecter
          </li>
        </ul>
        {signUpModal && <SignUpForm />}
        {loginModal && <LoginForm />}
      </div>
    </div>
  );
};

export default Log;
