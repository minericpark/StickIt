import { Paper } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { UserContext } from './context/user_context';

function StickyBoardPage() {
    const { board_id } = useParams();
    const { userID } = useContext(UserContext);
    const [title, setTitle] = useState(board_id);

    useEffect(() => {
        if (userID === null) return;

        axios
            .get(`/boards/${userID}/${board_id}`)
            .then((res) => {
                console.log(res.data);
                setTitle(res.data.title);
            })
            .catch((err) => {
                if (err.response.data.error) {
                    console.error(err.response.data.error);
                } else {
                    console.log(err.message);
                }
            });
    }, [userID, board_id]);

    if (userID === null) {
        return <Redirect to="/" />;
    }

    return (
        <div id="sticky-board" className="page">
            <Paper>
                <h1 className="title">{title}</h1>
            </Paper>
        </div>
    );
}

export default StickyBoardPage;
