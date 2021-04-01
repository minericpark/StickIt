import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user_context';

function EditStickyNotePage() {
    const { board_id, sticky_id } = useParams();
    const { userID } = useContext(UserContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errMsg, setError] = useState();

    function handleSubmit(e) {
        e.preventDefault();

        if (sticky_id) {
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
        } else {
            // create new sticky note
            axios
                .post('/sticky/create', {
                    board_id: board_id,
                    user_id: userID,
                    title: title,
                    desc: description,
                    // TODO: add a field for these values
                    type: 0,
                    due_date: null,
                })
                .catch((err) => {
                    if (err.response.data.msg) {
                        setError(err.response.data.msg);
                    } else {
                        setError(err.message);
                    }
                });
        }
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
        if (!sticky_id) return;

        // get sticky note information
        axios
            .get(`/sticky/${userID}/${board_id}/${sticky_id}`)
            .then((res) => {
                setTitle(res.data.title);
                setDescription(res.data.desc);
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
            <h1 className="title">
                {sticky_id ? 'Edit' : 'Create'} Sticky Note
            </h1>
            <form id="edit-sticky-form" onSubmit={handleSubmit}>
                <span className="error-message">{errMsg}</span>
                <TextField
                    name="title"
                    label="Title"
                    placeholder="Title"
                    value={title}
                    onChange={handleInput}
                />
                <TextField
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
