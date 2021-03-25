import { Grid, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

function StickyBoardCard({ title, board_id }) {
    return (
        <Grid item xs={3}>
            <Link className="board-link" to={`/board/${board_id}`}>
                <Paper className="sticky-board-card">{title}</Paper>
            </Link>
        </Grid>
    );
}

export default StickyBoardCard;
