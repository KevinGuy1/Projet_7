import React from "react";

const Post = (post) => {







  return <div className="post">

    <div className="Post">
      <div className="Post__header">
        <p>{post.userId}</p>
        {/* timer du post */}
        {/* bouton delete*/}
      </div>
      <div className="Post__content">
        <p>{post.message}</p>
        {/* {imageUrl} */}
        {/* bouton like */}
      </div>
    </div>
  </div>
    ;
};

export default Post;
