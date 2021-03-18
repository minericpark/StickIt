import { useHistory } from 'react-router-dom';
import { AppContext } from './user_context';

function Dashboard() {
    const history = useHistory();

    function logoutButtonClick() {
        history.push('/login');
    }

    return (
        <div>
            <AppContext.Consumer>
                {({ userID }) => <p>Welcome to your dashboard {userID}!!</p>}
            </AppContext.Consumer>
            <button onClick={logoutButtonClick}>Log Out</button>
        </div>
    );
}

export default Dashboard;
