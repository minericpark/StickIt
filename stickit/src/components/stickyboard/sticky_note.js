import { Grid, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

function StickyNote({
    sticky_id,
    board_id,
    title,
    description,
    advanced,
    dueDate,
    colour = 'yellow',
}) {
    return (
        <Grid item xs={2}>
            <Link className="sticky-link" to={`/edit/${board_id}/${sticky_id}`}>
                <Paper id={sticky_id} className={`sticky-note ${colour}`}>
                    <h2 className="title">{title}</h2>
                    <p className="description">{description}</p>
                    {advanced ? (
                        <p className="due-date">Due: {dueDate}</p>
                    ) : null}
                </Paper>
            </Link>
        </Grid>
    );
}

export default StickyNote;
