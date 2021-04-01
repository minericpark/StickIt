import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { UserContext } from './context/user_context';
import { Button, TextField, ButtonGroup } from '@material-ui/core';
import axios from 'axios';

function CreateBoardPage() {
    const { userID } = useContext(UserContext);

    const [title, setTitle] = useState('');
    const [state, setState] = useState(false);

    if (userID === null) {
        return <Redirect to="/" />;
    }
    if (state) {
        return <Redirect to="/" />;
    }

    /** Handle login submission.
     *
     * @param {*} event - the submit event
     */
    function handleCreateBoard(event) {
        event.preventDefault();

        // send (POST) newly created board to existing boards list

        axios
            .post('/boards/:user_id', {
                user_id: userID,
                title: title
            })
            .then((res) => {
                console.log('board created');
                setState(true);
                console.log(res.status);
            })
            .catch(() => {
                alert('Error - could not create new board');
            });  
    }

    /** Handle input from text fields and do some simple validation.
     *
     * @param {*} event - the text changed event
     */
    function handleInput(event) {
        let name = event.target.name;
        let value = event.target.value;

        if (name === 'title') {
            if (value.trim() !== '') {
                console.log(value);
                setTitle(value);
            }
        }
    }
    return (
        <div id="create_board_page" className="create-board-page">
            <form id="create-board-form" onSubmit={handleCreateBoard}>
                <h1 className="title">Create A New Board</h1>
                <TextField
                    label="Title"
                    name="title"
                    type="text"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    onChange={handleInput}
                    required={true}
                />

                <div>
                    <Link to="/" className="button-link">
                        <Button color="primary" variant="outlined" size="medium" id="board-cancel-button">
                            Cancel
                        </Button>
                    </Link>

                    <ButtonGroup size="medium" id="board-submit-button-group" variant="contained" disableElevation >
                        <Button color="primary" type="submit" id="board-submit-button">
                            Submit
                        </Button>
                    </ButtonGroup>
                </div>
               
            </form>
        </div>
    );
}

export default CreateBoardPage;
