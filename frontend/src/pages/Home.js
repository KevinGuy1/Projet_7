import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Thread from "../components/Thread";
import Cookies from 'js-cookie';


const Home = () => {
  let navigate = useNavigate();
  const token = Cookies.get(`token`);

  // Si token alors faire une requete AXIOS 
  // getAllUsers et envoyer les données dans le store
  // getCurrentUser et envoyer les donénes dans le store

  useEffect(() => {
    if (!token) navigate("/connexion");
  }, [navigate, token]);

  return (
    <div className="home">
      <Thread />
    </div>
  );
};

export default Home;
