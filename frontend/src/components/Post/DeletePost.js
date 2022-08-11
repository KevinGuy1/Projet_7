import React from "react";
import axios from "axios";
import Cookies from 'js-cookie';

const DeletePost = ({ id }) => {
    const token = Cookies.get('token');
    // console.log("props: " + id)

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
