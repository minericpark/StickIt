import { Button, ButtonGroup } from '@material-ui/core';
import { useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import icon from '../img/StickItIcon.png';
import { AppContext } from './context/user_context';

function LandingPage() {
    const history = useHistory();
    const { userID } = useContext(AppContext);

    function onLogin() {
        history.push('/login');
    }

    function onCreateAccount() {
        history.push('/create-account');
    }

    if (userID !== null) {
        return <Redirect to="/" />;
    }

    return (
        <div id="landing-page" className="page">
            <div>
                <h1>StickIt</h1>
                <img src={icon} alt="StickIt Icon" />
            </div>
            <ButtonGroup
                color="primary"
                variant="contained"
                orientation="vertical"
                disableElevation
            >
                <Button variant="contained" onClick={onCreateAccount}>
                    Create Account
                </Button>
                <Button variant="outlined" onClick={onLogin}>
                    Log In
                </Button>
            </ButtonGroup>
        </div>
    );
}

export default LandingPage;
