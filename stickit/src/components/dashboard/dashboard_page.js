import { Button, Grid, Paper } from '@material-ui/core';
import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext } from '../user_context';
import StickyBoardCard from './sticky_board_card';

function DashboardPage() {
    const { userID } = useContext(AppContext);

    const [stickyBoards, updateBoards] = useState([]);

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
                    stickyBoards.map((board, i) => (
                        <StickyBoardCard id={`board${i}`} title={board.name} />
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
                                    updateBoards([{ name: 'New Sticky Board' }])
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
