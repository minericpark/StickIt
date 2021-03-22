import { Grid, Paper } from '@material-ui/core';

function StickyBoardCard({ id, title }) {
    return (
        <Grid item xs={3} key={id}>
            <Paper className="sticky-board-card">{title}</Paper>
        </Grid>
    );
}

export default StickyBoardCard;
