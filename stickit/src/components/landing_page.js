import { Button, ButtonGroup } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import icon from '../img/StickItIcon.png';

function LandingPage() {
    const history = useHistory();

    function onLogin() {
        history.push('/login');
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
                <Button variant="contained">Create Account</Button>
                <Button variant="outlined" onClick={onLogin}>
                    Log In
                </Button>
            </ButtonGroup>
        </div>
    );
}

export default LandingPage;
