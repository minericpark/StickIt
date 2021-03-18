import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { AppContext } from './user_context';

function LoginPage() {
    const history = useHistory();
    const { userID, login } = useContext(AppContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setError] = useState('');

    function handleLogin(event) {
        let success = true;
        let errMsg = '';

        event.preventDefault();

        if (email.length === 0 || password.length === 0) {
            success = false;
            errMsg = 'Please enter your email and password';
        }

        // TODO: submit the login information for confirmation

        if (success) {
            login(email);
            history.push('/');
        } else {
            setError(errMsg);
        }
    }

    function handleInput(event) {
        let name = event.target.name;
        let value = event.target.value;
        let errMsg = '';

        if (name === 'email') {
            if (value.trim() !== '') {
                setEmail(value);
            }
        } else if (name === 'password') {
            if (value.trim() !== '') {
                setPassword(value);
            }
        }

        setError(errMsg);
    }

    // Attempting to login while a user is already logged in
    if (userID !== null) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div id="login-page">
            <form id="login-form" onSubmit={handleLogin}>
                <h1 className="title">Log In</h1>
                {errorMsg ? (
                    <div className="error-message">
                        {errorMsg}
                        <br />
                    </div>
                ) : null}
                <label htmlFor="email">Email:</label>
                <br />
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleInput}
                />
                <br />
                <label htmlFor="password">Password:</label>
                <br />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleInput}
                />
                <br />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default LoginPage;
