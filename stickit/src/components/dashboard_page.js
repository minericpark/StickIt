import { Button, Grid, Paper } from '@material-ui/core';
import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext } from './user_context';

function Dashboard() {
    const { userID } = useContext(AppContext);

    const [stickyBoards, updateBoards] = useState([]);

    // Attempting to navigate to dashboard without being logged in
    if (userID === null) {
        return <Redirect to="/" />;
    }

    return (
        <div id="dashboard-page" className="page">
            <p>Welcome to your dashboard {userID}!!</p>
            <div>
                <Grid
                    className="grid"
                    container
                    spacing={1}
                    cols={3}
                    alignContent="center"
                    justify="center"
                >
                    {stickyBoards.length > 0 ? (
                        stickyBoards.map((tile, i) => (
                            <Grid item xs={3}>
                                <Paper className="sticky-board-card">
                                    {tile.name}
                                </Paper>
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs>
                            <Paper className="sticky-board-card">
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    onClick={() =>
                                        updateBoards([{ name: 'New Board' }])
                                    }
                                >
                                    Create a New Board
                                </Button>
                            </Paper>
                        </Grid>
                    )}
                </Grid>
            </div>
        </div>
    );
}
//
export default Dashboard;
