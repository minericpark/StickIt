import React, { useContext, useState } from 'react';
import { UserContext } from './context/user_context';
import { Redirect } from 'react-router-dom';
import { Button, TextField, ButtonGroup } from '@material-ui/core';
import axios from 'axios';

function CreateAccountPage() {
    const { userID, login } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');

    if (userID !== null) {
        return <Redirect to="/dashboard" />;
    }

    /** Handle login submission.
     *
     * @param {*} event - the submit event
     */
    function handleCreate(event) {
        let success = true;

        event.preventDefault();

        if (fname.length === 0) {
            success = false;
        } else if (lname.length === 0) {
            success = false;
        } else if (email.length === 0) {
            success = false;
        } else if (password.length === 0) {
            success = false;
        }

        // First Send login request, if failed then create new profile
        axios
            .get('/accounts/login', {
                params: { email: email, password: password },
            })
            .then((res) => {
                success = res.status === 200;
                console.log('account already exists');
                //login(email);
            })
            .catch(() => {
                console.log('account does not exist');

                axios
                    .post('/profiles/create', {
                        user_id: email,
                        first_name: fname,
                        last_name: lname,
                    })
                    .then((res) => {
                        console.log('profile created');
                    })
                    .catch((res) => {
                        alert('Error - could not create new profile');
                        success = false;
                    });

                axios
                    .post('/accounts/createUser', {
                        user_id: email,
                        password: password,
                    })
                    .then((res) => {
                        console.log('account created');
                    })
                    .catch((res) => {
                        alert('Error - could not create new account');
                        success = false;
                    });
            })
            .then(() => {
                if (success) {
                    login(email);
                }
            });
    }

    /** Handle input from text fields and do some simple validation.
     *
     * @param {*} event - the text changed event
     */
    function handleInput(event) {
        let name = event.target.name;
        let value = event.target.value;

        if (name === 'fname') {
            if (value.trim() !== '') {
                setFname(value);
            }
        } else if (name === 'lname') {
            if (value.trim() !== '') {
                setLname(value);
            }
        } else if (name === 'email') {
            if (value.trim() !== '') {
                setEmail(value);
            }
        } else if (name === 'password') {
            if (value.trim() !== '') {
                setPassword(value);
            }
        }
    }
    return (
        <div id="create_account_page" className="create-account-page">
            <form id="create-account-form" onSubmit={handleCreate}>
                <h1 className="title">Create An Account</h1>
                <TextField
                    label="Firstname"
                    name="fname"
                    type="text"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    onChange={handleInput}
                    required={true}
                />
                <TextField
                    label="Lastname"
                    name="lname"
                    type="text"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    onChange={handleInput}
                    required={true}
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    onChange={handleInput}
                    required={true}
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    onChange={handleInput}
                    required={true}
                />
                <ButtonGroup size="small" variant="contained" disableElevation>
                    {/* TODO: <Button color="default">Cancel</Button> */}
                    <Button color="primary" type="submit">
                        Create An Account
                    </Button>
                </ButtonGroup>
            </form>
        </div>
    );
}

export default CreateAccountPage;
