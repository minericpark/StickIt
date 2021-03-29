import { Grid, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

function StickyBoardCard({ title, board_id, status }) {
    // TODO: how should the board be displayed if status === false?
    if (status) {
        return (
            <Grid item xs={3}>
                <Link className="board-link" to={`/board/${board_id}`}>
                    <Paper className="sticky-board-card">{title}</Paper>
                </Link>
            </Grid>
        );
    } else {
        return (
            <Grid item xs={3}>
                <Paper className="sticky-board-card disabled">{title}</Paper>
            </Grid>
        );
    }
}

export default StickyBoardCard;
