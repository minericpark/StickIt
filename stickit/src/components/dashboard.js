import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from './user_context';

function Dashboard() {
    const history = useHistory();
    const { userID, logout } = useContext(AppContext);

    function logoutButtonClick() {
        logout();
        history.push('/');
    }

    return (
        <div>
            <p>Welcome to your dashboard {userID}!!</p>
            <button onClick={logoutButtonClick}>Log Out</button>
        </div>
    );
}

export default Dashboard;
