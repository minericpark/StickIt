import { Button, Grid, Paper } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import { UserContext } from '../context/user_context';
import StickyNote from './sticky_note';

function StickyBoardPage() {
    const { board_id } = useParams();
    const { userID } = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [stickyNotes, setStickies] = useState([]);

    // Fetch information about the sticky board on load
    useEffect(() => {
        if (userID === null) return;

        axios
            .get(`/boards/${userID}/${board_id}`)
            .then((res) => {
                setTitle(res.data.title);
            })
            .catch((err) => {
                // failed to get board information
                if (err.response.data.error) {
                    console.error(err.response.data.error);
                } else {
                    console.log(err.message);
                }
            })
            .then(() => axios.get(`/sticky/${userID}/${board_id}`))
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                // failed to find sticky notes
                if (err.response.data.msg) {
                    console.error(err.response.data.msg);
                } else {
                    console.log(err.message);
                }

                return [];
            })
            .then((stickies) => {
                setStickies(stickies);
            });
    }, [userID, board_id]);

    if (userID === null) {
        return <Redirect to="/" />;
    }

    return (
        <div id="sticky-board" className="page">
            <Paper>
                <h1 className="title">{title}</h1>
                <div id="create-sticky-button">
                    <Link className="button-link" to={`/create/${board_id}`}>
                        <Button color="primary" variant="contained">
                            +
                        </Button>
                    </Link>
                </div>
                <Grid
                    className="grid"
                    container
                    spacing={1}
                    cols={3}
                    alignContent="center"
                    justify="center"
                >
                    {stickyNotes.map((sticky) => (
                        <StickyNote
                            key={sticky.sticky_id}
                            board_id={sticky.board_id}
                            sticky_id={sticky.sticky_id}
                            title={sticky.title}
                            description={sticky.desc}
                            advanced={sticky.type}
                            dueDate={sticky.due_date}
                            colour={sticky.colour}
                        />
                    ))}
                </Grid>
            </Paper>
        </div>
    );
}

export default StickyBoardPage;
