import { useHistory } from 'react-router-dom';

function Dashboard() {
    const history = useHistory();

    function logoutButtonClick() {
        history.push('/login');
    }

    return (
        <div>
            <p>Welcome to your dashboard!!</p>
            <button onClick={logoutButtonClick}>Log Out</button>
        </div>
    );
}

export default Dashboard;
