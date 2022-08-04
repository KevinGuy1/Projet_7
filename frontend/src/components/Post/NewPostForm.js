import React, { useState } from "react";
import { userStore } from "../Store";

const CreatePost = ({ posts, setPosts }) => {
  const [input, setInput] = useState("");
  // const [image, setImage] = useState("");
  const token = userStore((state) => state.token);
  const userId = userStore((state) => state.userId);
  const pseudo = userStore((state) => state.pseudo);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!input.length > 10) return window.alert("Insert more text");

      if (token) {
        const post = await fetch(`${process.env.REACT_APP_API_URL}api/posts`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: {
            post: {
              userId: userId,
              message: input
              // imageUrl: récuperer l'image,
            }
          },
        });
        const data = await post.json();
        setPosts([data, ...posts]);
        console.log(data);
        setInput("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className="createPost">
      <div>{pseudo}</div>
      <form onSubmit={handleSubmit}>
        <textarea name="input"
          value={input}
          onChange={handleChange}
          type="text"
          placeholder={`Quoi de neuf ?`} />
        {/* TODO Ajout de l'image */}
        <button
          disabled={!input}
          type="submit"
        // onClick={postAlert}
        >
          Envoyer
        </button>
      </form>
    </div>
  )
};

export default CreatePost;
