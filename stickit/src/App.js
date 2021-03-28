import './css/App.css';
import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { AppContext } from './components/context/user_context';
import DashboardPage from './components/dashboard/dashboard_page';
import LoginPage from './components/login_page';
import { AppContext } from './components/user_context';
import CreateAccount from "./components/create_account_page";
import MenuBar from './components/menubar/menu_bar';
import TestPage from './components/test_page';
import StickyBoard from './components/sticky_board';
import LandingPage from './components/landing_page';

function App() {
    const { userID } = useContext(AppContext);

    const pagesInfo = [
        {
            pageName: 'Dashboard',
            pageRoute: '/dashboard'
        },
        {
            pageName: 'Test',
            pageRoute: '/test'
        }
    ]

    useEffect(() => {
        localStorage.setItem('userID', userID);
    }, [userID]);

    return (
        <Router>
            {userID ? <MenuBar pagesInfo={pagesInfo}/> : null}
            <Switch>
                <Route exact path="/test" component={TestPage} />
                <Route exact path="/dashboard" component={DashboardPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/board/:board_id" component={StickyBoard} />
                <Route exact path="/">
                    {userID ? <Redirect to="/dashboard" /> : <LandingPage />}
                </Route>
                {/* If route is invalid/undefined */}
                <Route>
                    <Redirect to="/" />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
