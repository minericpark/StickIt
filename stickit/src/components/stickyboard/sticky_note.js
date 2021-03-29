import { Grid, Paper } from '@material-ui/core';

function StickyNote({
    title,
    description,
    advanced,
    dueDate,
    colour = 'yellow',
}) {
    return (
        <Grid item xs={2}>
            <Paper className={`sticky-note ${colour}`}>
                <h2 className="title">{title}</h2>
                <p className="description">{description}</p>
                {advanced ? <p className="due-date">Due: {dueDate}</p> : null}
            </Paper>
        </Grid>
    );
}

export default StickyNote;
