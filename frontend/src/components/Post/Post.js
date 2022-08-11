import React, { useState } from "react";
import { dateParser } from "../Utils";
import { userStore } from "../Store";
import DeletePost from "./DeletePost";
import LikeButton from "./LikeButton";

const Post = ({ post }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const userId = userStore((state) => state.userId);

  const updateItem = () => {
    if (textUpdate) {
      console.log("message mis à jour avec succès")
    }
    setIsUpdated(false);
  };

  return (
    <div className="post-container" key={post._id}>
      <div className="post">
        {/* pseudo + date */}
        <div className="pseudo">
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
        {userId === post.userId && (
          <div className="button-container">
            <div onClick={() => setIsUpdated(!isUpdated)}>
              {/* <img src="./img/icons/edit.svg" alt="edit" /> */}
              Modifier
            </div>
            <DeletePost id={post._id} />
          </div>
        )}
        <LikeButton post={post} />


      </div>

    </div>

  )
};

export default Post;



// <p>{post.pseudo}</p>
//       <p>{post.message}</p>
//       <p>{post.createdAt}</p>