import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post/Post";
import Cookies from 'js-cookie';
import NewPostForm from "../components/Post/NewPostForm";


const Thread = () => {
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
        const sortedPost = res.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return setPosts(sortedPost)
      }
      // to do declencher un alerte
    }
    fetchPost();
  }, [token, setPosts]);


  return (
    <div className="feed">
      <NewPostForm posts={posts} setPosts={setPosts} />
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Thread;