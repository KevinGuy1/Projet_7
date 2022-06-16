import React, { useContext } from "react";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";

const Home = () => {
  return (
    <div className="home">
      <Thread />
    </div>
  );
};

export default Home;
