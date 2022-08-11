import React, { useState } from "react";
import { userStore } from "../Store";
import axios from "axios";

const CreatePost = ({ posts, setPosts }) => {
  const [input, setInput] = useState("");
  const [image, setImage] = useState("");
  const token = userStore((state) => state.token);
  const userId = userStore((state) => state.userId);
  const pseudo = userStore((state) => state.pseudo);


  const handleImg = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   if (input) {
    //     const post = new FormData();
    //     post.append('pseudo', pseudo);
    //     post.append('userId', userId);
    //     post.append('message', input);
    //     // if (image) image.append("image", image);

    //     await axios({
    //       method: "post",
    //       url: `${process.env.REACT_APP_API_URL}api/posts`,
    //       body: post,
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "application/json",
    //       },

    //     })
    //       .then(function (response) {
    //         //handle success
    //         console.log(response);
    //       })
    //       .catch(function (response) {
    //         //handle error
    //         console.log(response);
    //       });
    //     console.log(post)
    //     setPosts([post, ...posts]);
    //   } else {
    //     alert("Veuillez entrer un message")
    //   }
    // } catch (error) {
    //   console.log(error.message);
    // }

    try {
      if (token) {
        const submitPost = await axios({
          method: "POST",
          url: `${process.env.REACT_APP_API_URL}api/posts`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            post: JSON.stringify({
              pseudo: pseudo,
              userId: userId,
              message: input,
              image: image
            })
          },
        })
          .then(function (response) {
            // const data = ;
            console.log(response)
            // setPosts([data, ...posts]);
            setInput("");
          })
          .catch(function (error) {
            console.log(error);
          });

      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className="createPost">
      <div className="pseudo">{pseudo}</div>
      <form className="post-form" onSubmit={handleSubmit}>
        <textarea name="input"
          value={input}
          onChange={handleChange}
          type="text"
          placeholder={`Quoi de neuf ?`} />
        {/* ajout img */}
        <div className="img-upload">
          <img src="" alt="icone-img" />
          <input
            type="file"
            id="file-upload"
            name="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => handleImg(e)} />

        </div>
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
