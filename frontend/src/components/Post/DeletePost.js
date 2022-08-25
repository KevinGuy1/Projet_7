import React from "react";
import axios from "axios";
import Cookies from 'js-cookie';

const DeletePost = ({ id, setPosts }) => {
    const token = Cookies.get('token');

    const deleteQuote = async () => {
        try {
            console.log(id)
            await axios({
                method: "DELETE",
                url: `${process.env.REACT_APP_API_URL}api/posts/${id}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(function (res) {
                    console.log("deleteRes : " + JSON.stringify(res))
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


        }
        catch (error) {
            console.log({ error });
        }
    }

    return (
        <div
            onClick={() => {
                if (window.confirm("Etes vous sûr de vouloir supprimer ce message ?")) {
                    deleteQuote();
                }
            }}
        >
            <img src="./img/icons/trash.svg" alt="Supprimer" />
        </div>
    );
};

export default DeletePost;
