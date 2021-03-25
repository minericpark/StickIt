import { Button, Grid, Paper } from '@material-ui/core';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext } from '../user_context';
import StickyBoardCard from './sticky_board_card';

function DashboardPage() {
    const { userID } = useContext(AppContext);

    const [stickyBoards, updateBoards] = useState([]);

    // should only run when the component loads
    useEffect(() => {
        if (userID === null) return;

        console.log('Fetching board information');

        // temp test values
        let boards = [
            { board_id: 'board_1', title: 'First Board', status: 'Active' },
            { board_id: 'board_2', title: 'Test Board', status: 'Active' },
        ];

        axios
            .get(`/boards/${userID}`)
            .then((res) => {
                // TODO: figure out the format of the return value
                console.log(res);
                boards = res;
            })
            .catch((err) => {
                /* TODO: Should this alert the user?
                 * Maybe put an error message in place
                 * of the board information */
                console.info('Using test values for now');
            })
            .then(() => {
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
                                onClick={() =>
                                    updateBoards([
                                        {
                                            board_id: 'board_1',
                                            title: 'New Sticky Board',
                                            status: 'Active',
                                        },
                                    ])
                                }
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
//
export default DashboardPage;