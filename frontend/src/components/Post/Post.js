import React, { useState } from "react";
import { dateParser } from "../Utils";
import { userStore } from "../Store";
import DeletePost from "./DeletePost";
import LikeButton from "./LikeButton";
import axios from "axios";
import Cookies from 'js-cookie';


const Post = ({ post, setPosts }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const pseudo = userStore((state) => state.pseudo);
  const userId = userStore((state) => state.userId);
  const role = userStore((state) => state.role);

  const token = Cookies.get('token');

  const updateItem = () => {
    if (textUpdate) {
      let formData = new FormData();
      formData.append("post", JSON.stringify({
        message: textUpdate,
      })
      );
      axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      })
        .then(function (response) {
          console.log(response);
          async function fetchPost() {
            const getAllPosts = {
              method: 'get',
              url: `${process.env.REACT_APP_API_URL}api/posts`,
              headers: { 'Authorization': `Bearer ${token}` }
            }
            let res = await axios(getAllPosts)
            console.log(res.data)
            if (res.status === 200) {
              const sortedPost = res.data.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt)
              })
              return setPosts(sortedPost)
            }
          }
          fetchPost();
        })
        .catch(function (response) {
          console.log(response);
        });
    }
    setIsUpdated(false);
  }
  return (
    <div className="post-container" key={post._id}>
      {/* pseudo + date */}
      <div className="post-header">
        <h3>{post.pseudo}</h3>
        <span>{dateParser(post.createdAt)}</span>
      </div>
      {/* message */}
      {isUpdated === false && <p>{post.message}</p>}
      {isUpdated && (
        <div className="update-post">
          <textarea
            defaultValue={post.message}
            onChange={(e) => setTextUpdate(e.target.value)}
          />
          <div className="button-container">
            <button className="btn" onClick={updateItem}>
              Valider modification
            </button>
          </div>
        </div>
      )}
      {/* Image */}
      {post.imageUrl && (
        <img src={post.imageUrl} alt="post-img" className="post-img" />
      )}
      {/* Si c'est notre post alors apparition de 2 boutons (modif et delete) */}
      {(userId === post.userId || role === "admin") && (
        <div className="button-container">
          <div onClick={() => setIsUpdated(!isUpdated)}>
            <img src="./img/icons/edit.svg" alt="edit" />
          </div>
          <DeletePost id={post._id} setPosts={setPosts} />
        </div>
      )}
      <div className="like-container">
        <LikeButton post={post} />
      </div>
    </div>

  )
};

export default Post;

