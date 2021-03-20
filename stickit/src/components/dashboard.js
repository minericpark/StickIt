import React, {useContext} from 'react';
import { AppContext } from './user_context';

function Dashboard() {
    const { userID } = useContext(AppContext);

    return (
        <div id="dashboard-page" className="page">
            <p>Welcome to your dashboard {userID}!!</p>
        </div>
    );
}

export default Dashboard;
