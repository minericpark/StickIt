import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/user_context';

function EditStickyNotePage() {
    const { board_id, sticky_id } = useParams();
    const { userID } = useContext(AppContext);

    // NOTE: currenlty defaulting the displayed title to the sticky_id
    const [title, setTitle] = useState(sticky_id);
    const [description, setDescription] = useState();
    const [errMsg, setError] = useState();

    function handleSubmit(e) {
        e.preventDefault();

        // submit changes
        axios
            .patch(`/sticky/edit/${userID}/${board_id}/${sticky_id}`, {
                title: title,
                description: description,
            })
            .catch((err) => {
                if (err.response.data.msg) {
                    setError(err.response.data.msg);
                } else {
                    setError(err.message);
                }
            });
    }

    function handleInput(e) {
        let name = e.target.name;
        let value = e.target.value;

        if (name === 'title') {
            setTitle(value);
        } else if (name === 'description') {
            setDescription(value);
        }
    }

    useEffect(() => {
        if (userID === null) return;
        if (sticky_id === null) return;

        // get sticky note information
        axios
            .get(`/sticky/${userID}/${board_id}/${sticky_id}`)
            .then((res) => {
                setTitle(res.data.title);
                setDescription(res.data.description);
                setError('');
            })
            .catch((err) => {
                let message = err.message;

                if (err.response.data.msg) {
                    message = err.response.data.msg;
                }

                console.info(message);
                setError(message);
            });
    }, [userID, sticky_id, board_id]);

    if (userID === null) {
        return <Redirect to="/" />;
    }

    return (
        <div id="edit-sticky-page" className="page">
            <h1 className="title">Edit Sticky Note</h1>
            <form id="edit-sticky-form" onSubmit={handleSubmit}>
                <span className="error-message">{errMsg}</span>
                <TextField
                    id="title"
                    name="title"
                    label="Title"
                    placeholder="Title"
                    value={title}
                    onChange={handleInput}
                />
                <TextField
                    id="description"
                    name="description"
                    label="Description"
                    placeholder="Description"
                    multiline
                    rows={4}
                    value={description}
                    onChange={handleInput}
                />

                <Link className="sticky-link" to={`/board/${board_id}`}>
                    <Button color="primary" variant="outlined">
                        Cancel
                    </Button>
                </Link>
                <Button type="submit" color="primary" variant="contained">
                    Save
                </Button>
            </form>
        </div>
    );
}

export default EditStickyNotePage;
