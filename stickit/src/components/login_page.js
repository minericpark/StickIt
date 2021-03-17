import React from 'react';
import { useHistory } from 'react-router-dom';

function LoginPage() {
    const history = useHistory();

    function loginButtonClick() {
        history.push('/dashboard');
    }

    return (
        <div>
            <p>TODO: Login form</p>
            <button onClick={loginButtonClick}>Log In</button>
        </div>
    );
}

export default LoginPage;
