import { Grid, Paper } from '@material-ui/core';

function DashboardCard({ id, title }) {
    return (
        <Grid item xs key={id}>
            <Paper className="sticky-board-card">{title}</Paper>
        </Grid>
    );
}

export default DashboardCard;
