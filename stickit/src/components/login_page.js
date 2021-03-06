import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { UserContext } from './context/user_context';
import axios from 'axios';

function LoginPage() {
    const { userID, login } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState({ email: false, password: false });
    const [errorMsg, setError] = useState('');

    /** Handle login submission.
     *
     * @param {*} event - the submit event
     */
    function handleLogin(event) {
        let success = true;
        let errMsg = '';

        event.preventDefault();

        // Ensure email and password are not empty strings
        if (email.length === 0) {
            success = false;
            errMsg = 'Please enter your email';
            toggleError({ email: true });
        } else if (password.length === 0) {
            success = false;
            errMsg = 'Please enter your password';
            toggleError({ password: true });
        } else {
            toggleError({ email: false, password: false });
        }

        if (!success) {
            setError(errMsg);
            return;
        }

        // Send login request
        axios
            .get('/accounts/login', {
                params: { email: email, password: password },
            })
            .then((res) => {
                success = res.status === 200;
            })
            .catch((error) => {
                success = false;
                toggleError({ email: true, password: true });

                if (error.response) {
                    errMsg = error.response.data.error;
                } else {
                    errMsg = error.message;
                }
            })
            .then(() => {
                if (success) {
                    login(email);
                } else {
                    setError(errMsg);
                }
            });
    }

    /** Handle input from text fields and do some simple validation.
     *
     * @param {*} event - then text changed event
     */
    function handleInput(event) {
        let name = event.target.name;
        let value = event.target.value;
        let errMsg = '';

        if (name === 'email') {
            if (value.trim() !== '') {
                setEmail(value);
            } else {
                toggleError({ email: true });
                setError('Enter an email');
            }
        } else if (name === 'password') {
            if (value.trim() !== '') {
                setPassword(value);
            } else {
                toggleError({ password: true });
                setError('Enter password');
            }
        }

        setError(errMsg);
    }

    // Attempting to login while a user is already logged in
    if (userID !== null) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div id="login-page" className="page">
            <form id="login-form" onSubmit={handleLogin}>
                <h1 className="title">Log In</h1>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    error={error.email}
                    helperText={error.email ? errorMsg : null}
                    onChange={handleInput}
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    size="small"
                    margin="dense"
                    variant="outlined"
                    error={error.password}
                    helperText={error.password ? errorMsg : null}
                    onChange={handleInput}
                />
                <div>
                    <Link to="/" className="button-link">
                        <Button color="primary" variant="outlined" size="small">
                            Cancel
                        </Button>
                    </Link>
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        size="small"
                    >
                        Log In
                    </Button>
                </div>
                <Link to="/create-account">Create Account</Link>
            </form>
        </div>
    );
}

export default LoginPage;
