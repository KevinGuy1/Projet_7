import React, { useState } from "react";
import axios from "axios";
// import { userStore } from "../Store";
import Cookies from 'universal-cookie';

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { setCurrentUser } = userStore();


  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/auth/login`,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          // TO DO backend faire l'envoie d'erreur
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          // setCurrentUser(res.data.pseudo, res.data.userId, res.data.token, res.data.role);

          const maxAge = 60 * 60 * 1000;
          const cookies = new Cookies();
          cookies.set('token', res.data.token, { httpOnly: false }, maxAge);
          cookies.set('pseudo', res.data.pseudo, { httpOnly: false }, maxAge);
          cookies.set('userId', res.data.userId, { httpOnly: false }, maxAge);
          cookies.set('role', res.data.role, { httpOnly: false }, maxAge);
          window.location = "/";

        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="w-2/3 py-4" action="" onSubmit={handleLogin}>
      <label htmlFor="email">Email</label>
      <br />
      <input
        className="rounded-xl pl-2 focus-visible:outline-none"
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        className="rounded-xl pl-2 focus-visible:outline-none"
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input
        className="bg-secondary rounded-2xl px-3 py-1 hover:bg-primary hover:text-white hover:shadow-primary hover:shadow-sm"
        type="submit"
        value="Se connecter" />
    </form>
  );
};

export default SignInForm;
