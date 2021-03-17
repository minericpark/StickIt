import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function LoginPage() {
    const history = useHistory();

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
            history.push('/dashboard');
        } else {
            setError(errMsg);
        }
    }

    function handleInput(event) {
        let name = event.target.name;
        let value = event.target.value;

        if (name === 'email') {
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
        <div id="login-page">
            <h1>Log In</h1>
            <form id="login-form" onSubmit={handleLogin}>
                {errorMsg ? (
                    <div className="error-message">
                        {errorMsg}
                        <br />
                    </div>
                ) : null}
                <label>
                    Email:
                    <br />
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={handleInput}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <br />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleInput}
                    />
                </label>
                <br />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default LoginPage;
