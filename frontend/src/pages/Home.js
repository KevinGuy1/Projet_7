import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";
import Cookies from 'js-cookie';


const Home = () => {
  let navigate = useNavigate();
  const token = Cookies.get(`token`);

  useEffect(() => {
    // if token est présent en cookie et si !== '' 
    if (!token) navigate("/connexion");
  }, [navigate, token]);

  return (
    <div className="home">
      <NewPostForm />
      <Thread />
    </div>
  );
};

export default Home;
