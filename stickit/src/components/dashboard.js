import React, {useContext} from 'react';
import { AppContext } from './user_context';
import {Redirect} from "react-router-dom";

function Dashboard() {
    const { userID } = useContext(AppContext);

    // Attempting to navigate to dashboard without being logged in
    if (userID === null) {
        return <Redirect to="/" />;
    }

    return (
        <div id="dashboard-page" className="page">
            <p>Welcome to your dashboard {userID}!!</p>
        </div>
    );
}

export default Dashboard;
