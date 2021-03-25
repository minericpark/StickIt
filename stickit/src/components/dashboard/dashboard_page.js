import { Button, Grid, Paper } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext } from '../user_context';
import StickyBoardCard from './sticky_board_card';

function DashboardPage() {
    const { userID } = useContext(AppContext);

    const [stickyBoards, updateBoards] = useState([]);

    // should only run when the component loads
    useEffect(() => {
        fetchStickyBoards();
    }, []);

    /**Fetch list of user's sticky boards*/
    function fetchStickyBoards() {
        console.log('Fetching board information');

        // TODO: actually fetch the list of boards

        updateBoards([
            { id: 'board_1', name: 'First Board' },
            { id: 'board_2', name: 'Test Board' },
            { id: 'board_3', name: 'Test Board' },
            { id: 'board_4', name: 'Test Board' },
        ]);
    }

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
                            key={board.id}
                            board_id={board.id}
                            title={board.name}
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
                                            id: 'board_1',
                                            name: 'New Sticky Board',
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
