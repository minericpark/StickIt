import { Paper } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { AppContext } from './context/user_context';

function StickyBoardPage() {
    const { board_id } = useParams();
    const { userID } = useContext(AppContext);
    const [title, setTitle] = useState(board_id);

    if (userID === null) {
        return <Redirect to="/" />;
    }

    return (
        <div id="sticky-board" className="page">
            <Paper>
                <h1>{title}</h1>
            </Paper>
        </div>
    );
}

export default StickyBoardPage;
