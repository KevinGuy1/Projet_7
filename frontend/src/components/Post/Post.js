import React, { useState } from "react";
import { dateParser } from "../Utils";
// import { userStore } from "../Store";
import DeletePost from "./DeletePost";
import LikeButton from "./LikeButton";
import axios from "axios";
import Cookies from 'js-cookie';


const Post = ({ post, setPosts }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);

  const token = Cookies.get('token');
  const userId = Cookies.get("userId");
  const role = Cookies.get("role");

  // const userId = userStore((state) => state.userId);
  // const role = userStore((state) => state.role);


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
    <div className="bg-white border-solid border-2 border-secondary rounded-lg shadow-md shadow-secondary w-4/5 m-auto my-5" key={post._id}>
      {/* pseudo + date */}
      <div className="flex justify-between p-2">
        <h3>{post.pseudo}</h3>
        <span className="italic text-tertiary">{dateParser(post.createdAt)}</span>
      </div>
      {/* message */}
      {isUpdated === false && <p className="px-2">{post.message}</p>}
      {/* modif post */}
      {isUpdated && (
        <div >
          <textarea
            className="border-solid border border-secondary p-2.5 rounded-xl resize-none focus:shadow-secondary focus:shadow-md focus:border-none focus-visible:outline-none"
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
        <img src={post.imageUrl} alt="post-img" className="object-contain w-full max-h-80	p-2 rounded-xl" />
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

