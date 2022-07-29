import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post/Post";
import Cookies from 'js-cookie';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const token = Cookies.get('token');


  useEffect(() => {
    async function fetchPost() {

      const getAllPosts = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}api/posts`,
        headers: { 'Authorization': `Bearer ${token}` }
      }

      let res = await axios(getAllPosts)
      console.log(res.data)
      if (res.status === 200) {
        return setPosts(res.data)
      }
      // to do declencher un alerte
    }
    fetchPost();
  }, [token]);

  return (
    <div className="feed">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Feed;