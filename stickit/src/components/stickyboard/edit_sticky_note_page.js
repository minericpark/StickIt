import { Button, Select, TextField } from '@material-ui/core';
import axios from 'axios';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user_context';

function EditStickyNotePage() {
    const { board_id, sticky_id } = useParams();
    const { userID } = useContext(UserContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [template, setTemplate] = useState(0);
    const [dueDate, setDueDate] = useState('');
    const [saved, toggleSaved] = useState(false);
    const [errMsg, setError] = useState();

    function handleSubmit(e) {
        e.preventDefault();

        if (sticky_id) {
            // submit changes
            axios
                .patch(`/sticky/edit/${userID}/${board_id}/${sticky_id}`, {
                    title: title,
                    desc: description,
                    type: template,
                    due_date: dueDate,
                })
                .then(() => {
                    toggleSaved(true);
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
                    type: template,
                    due_date: dueDate,
                })
                .then(() => {
                    toggleSaved(true);
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

    function handleDelete() {
        if (
            window.confirm(
                'This will permenantely delete the sticky note.\nAre you sure you would like to delete this sticky note?'
            )
        ) {
            axios
                .delete(`/sticky/delete/${userID}/${board_id}/${sticky_id}`)
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data.msg);
                    }
                    toggleSaved(true);
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
        } else if (name === 'template') {
            console.log('template', value);
            setTemplate(value);
        } else if (name === 'dueDate') {
            setDueDate(value);
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
                setTemplate(res.data.type);

                if (res.data.type) {
                    setDueDate(res.data.due_date);
                }
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

    if (saved) {
        return <Redirect to={`/board/${board_id}`} />;
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
                    size="small"
                    margin="dense"
                    variant="outlined"
                    value={title}
                    onChange={handleInput}
                />
                <Select
                    native
                    name="template"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    value={template}
                    onChange={handleInput}
                >
                    <option value={0}>Basic Sticky Note</option>
                    <option value={1}>Advanced Sticky Note</option>
                </Select>
                <TextField
                    name="description"
                    label="Description"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={description}
                    onChange={handleInput}
                />
                {template > 0 ? (
                    <TextField
                        name="dueDate"
                        label="Due Date"
                        type="date"
                        size="small"
                        margin="dense"
                        variant="outlined"
                        value={dueDate}
                        onChange={handleInput}
                        InputLabelProps={{ shrink: true }}
                    />
                ) : null}
                <div>
                    <Link className="button-link" to={`/board/${board_id}`}>
                        <Button color="primary" variant="outlined">
                            Cancel
                        </Button>
                    </Link>
                    <Button type="submit" color="primary" variant="contained">
                        Save
                    </Button>
                </div>
                {sticky_id ? (
                    <Fragment>
                        <br />
                        <Button
                            color="secondary"
                            variant="contained"
                            size="small"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </Fragment>
                ) : null}
            </form>
        </div>
    );
}

export default EditStickyNotePage;
