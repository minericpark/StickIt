import { Button, Grid, Paper } from '@material-ui/core';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext } from '../context/user_context';
import StickyBoardCard from './sticky_board_card';

function DashboardPage() {
    const { userID } = useContext(AppContext);

    const [stickyBoards, updateBoards] = useState([]);

    function handleCreateBoard() {
        // TODO: redirect to/open the create board form
        updateBoards([
            {
                user_id: userID,
                board_id: 'board_1',
                title: 'New Sticky Board',
                status: true,
            },
        ]);
    }

    // should only run when the component loads
    useEffect(() => {
        if (userID === null) return;

        axios
            .get(`/boards/${userID}`)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                if (err.response) {
                    // TODO: confirm this is the correct error message
                    console.error(err.response.data.error);
                }

                // TODO: remove temp test values
                console.info('Using test values for now');
                return [
                    {
                        user_id: userID,
                        board_id: 'board_1',
                        title: 'First Board',
                        status: 'Active',
                    },
                    {
                        user_id: userID,
                        board_id: 'board_2',
                        title: 'Test Board',
                        status: 'Active',
                    },
                ];
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
