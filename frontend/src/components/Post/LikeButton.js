import React, { useEffect, useState } from "react";
import { userStore } from "../Store";
import axios from "axios";
import Cookies from 'js-cookie';


const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const userId = userStore((state) => state.userId);
    const token = Cookies.get('token');

    const like = () => {
        try {
            const like = 1;
            console.log(like)
            axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}/like`,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: {
                    userId: userId,
                    like: like
                }
            })
                .then(function (response) {
                    console.log("reponse like: " + response)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        catch (error) {
            console.log({ error });
        }
        setLiked(true);
    };

    const unlike = () => {
        try {
            const like = 0;
            console.log(like)
            axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}/like`,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: {
                    userId: userId,
                    like: like
                }
            })
                .then(function (response) {
                    console.log("reponse unlike : " + response)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        catch (error) {
            console.log({ error });
        }
        setLiked(false);
    };

    // useEffect(() => {
    //     if (post.usersLiked.includes(userId)) setLiked(true);
    //     else setLiked(false);
    // }, [userId, post.usersLiked, liked]);

    return (
        <div className="like-container">
            {liked === false && (
                <img src="./img/icons/heart.svg" onClick={like} alt="like" />
            )}
            {liked && (
                <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
            )}
            <span>{post.likes}</span>
        </div>
    );
};

export default LikeButton;
