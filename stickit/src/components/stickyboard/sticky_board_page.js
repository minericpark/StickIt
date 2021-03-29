import { Grid, Paper } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { UserContext } from './context/user_context';
import StickyNote from './sticky_note';

function StickyBoardPage() {
    const { board_id } = useParams();
    const { userID } = useContext(UserContext);
    const [title, setTitle] = useState(board_id);

    // Fetch information about the sticky board on load
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
                <Grid
                    className="grid"
                    container
                    spacing={1}
                    cols={3}
                    alignContent="center"
                    justify="center"
                >
                    <StickyNote
                        board_id={board_id}
                        sticky_id="sticky_1"
                        title="First Sticky Note"
                        description="A basic sticky note without a due date"
                    />
                    <StickyNote
                        board_id={board_id}
                        sticky_id="sticky_2"
                        title="Advanced Sticky"
                        description="An advanced sticky note with a due date"
                        advanced
                        dueDate="10/10/10"
                        colour="blue"
                    />
                    <StickyNote
                        board_id={board_id}
                        sticky_id="sticky_3"
                        title="Green Sticky Note"
                        description="A basic sticky note that is green"
                        colour="green"
                    />
                </Grid>
            </Paper>
        </div>
    );
}

export default StickyBoardPage;
