import { Paper } from '@material-ui/core';
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext } from './context/user_context';

function StickyBoard({
    match: {
        params: { board_id },
    },
}) {
    const { userID } = useContext(AppContext);

    if (userID === null) {
        return <Redirect to="/" />;
    }

    return (
        <div id="sticky-board" className="page">
            <Paper>
                <h1>{board_id}</h1>
            </Paper>
        </div>
    );
}

export default StickyBoard;
