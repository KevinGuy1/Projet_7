import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";
import { useStore } from "../components/Store";

const Home = () => {
  let navigate = useNavigate();
  const token = useStore((state) => state.token);

  // useEffect(() => {
  //   if () navigate("/connexion");
  // }, [navigate, token]);

  return (
    <div className="home">
      <NewPostForm />
      <Thread />
    </div>
  );
};

export default Home;
