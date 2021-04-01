import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { UserContext } from './context/user_context';
import { Button, TextField, ButtonGroup } from '@material-ui/core';
import axios from 'axios';

function CreateBoardPage() {
    const { userID } = useContext(UserContext);

    const [title, setTitle] = useState('');

    if (userID === null) {
        return <Redirect to="/" />;
    }

    /** Handle login submission.
     *
     * @param {*} event - the submit event
     */
    function handleCreateBoard(event) {
        let success = true;
    
        event.preventDefault();

        if (title === 0) {
            success = false;
        }

        // send (POST) newly created board to existing boards list
            

        axios
            .post('/boards/:user_id', {
                user_id: userID,
                title: title
            })
            .then((res) => {
                console.log('board created');
            })
            .catch((res) => {
                alert('Error - could not create new board');
                success = false;
            });
            
        
            
    }

    /** Handle input from text fields and do some simple validation.
     *
     * @param {*} event - the text changed event
     */
    function handleInput(event) {
        let name = event.target.name;
        let value = event.target.value;

        //setBoardId("27");

        if (name === 'title') {
            if (value.trim() !== '') {
                console.log(value);
                setTitle(value);
            }
        }

        // } else if (name === 'description') {
        //     if (value.trim() !== '') {
        //         setDescription(value);
        //     }
        // } else if (name === 'categories') {
        //     if (value.trim() !== '') {
        //         setCategories(value);
        //     }
        //   }

        
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
                {/* <TextField
                    label="Description"
                    name="description"
                    type="text"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    onChange={handleInput}
                />
                <TextField
                    label="Categories"
                    name="categories"
                    type="text"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    onChange={handleInput}
                /> */}

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
