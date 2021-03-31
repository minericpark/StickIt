import { Button, Grid, Paper } from '@material-ui/core';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../context/user_context';
import StickyBoardCard from './sticky_board_card';

function DashboardPage() {
    const { userID } = useContext(UserContext);

    const [stickyBoards, updateBoards] = useState([]);

    function handleCreateBoard() {
        // TODO: redirect to/open the create board form?
        let newBoard = {
            user_id: userID,
            title: 'New Sticky Board',
            status: true,
        };

        axios
            .post(`/boards/${userID}`, newBoard)
            .then(() => {
                console.log('Successfully created new board!');
                window.location.reload();
            })
            .catch((err) => {
                if (err.response) {
                    console.error(err.response.data.errror);
                } else {
                    console.error(err.message);
                }
            });
    }

    // Fetch user's sticky boards
    useEffect(() => {
        if (userID === null) return;

        axios
            .get(`/boards/${userID}`)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                if (err.response) {
                    console.error(err.response.data.error);
                }

                return [];
            })
            .then((boards) => {
                updateBoards(boards);
            });
    }, [userID]);

    // Attempting to navigate to dashboard without being logged in
    if (userID === null) {
        return <Redirect to="/" />;
    }

    return (
        <div id="dashboard-page" className="page">
            <Grid
                className="grid"
                container
                spacing={1}
                cols={3}
                alignContent="center"
                justify="center"
            >
                {stickyBoards.length > 0 ? (
                    stickyBoards.map((board) => (
                        <StickyBoardCard
                            key={board.board_id}
                            board_id={board.board_id}
                            title={board.title}
                            status={board.status}
                        />
                    ))
                ) : (
                    <Grid item xs>
                        <Paper className="sticky-board-card">
                            <p>
                                Welcome to your dashboard {userID}!! You
                                currently have no sticky boards
                            </p>
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={handleCreateBoard}
                            >
                                Create a New Board
                            </Button>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}

export default DashboardPage;
