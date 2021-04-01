import './css/App.css';
import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { UserContext } from './components/context/user_context';
import DashboardPage from './components/dashboard/dashboard_page';
import LoginPage from './components/login_page';
import CreateAccountPage from './components/create_account_page';
import CreateBoardPage from './components/create_board_page';
import MenuBar from './components/menubar/menu_bar';
import StickyBoardPage from './components/stickyboard/sticky_board_page';
import LandingPage from './components/landing_page';
import EditStickyNotePage from './components/stickyboard/edit_sticky_note_page';

function App() {
    const { userID } = useContext(UserContext);

    const pagesInfo = [
        {
            pageName: 'Dashboard',
            pageRoute: '/dashboard',
        },
        {
            pageName: 'Test',
            pageRoute: '/test',
        },
    ];

    // Store userID when it is changed
    useEffect(() => {
        localStorage.setItem('userID', userID);
    }, [userID]);

    return (
        <Router>
            {userID ? <MenuBar pagesInfo={pagesInfo} /> : null}
            <Switch>
                <Route exact path="/dashboard" component={DashboardPage} />
                <Route
                    exact
                    path="/create-account"
                    component={CreateAccountPage}
                />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/create-board" component={CreateBoardPage} />
                <Route
                    exact
                    path="/board/:board_id"
                    component={StickyBoardPage}
                />
                <Route
                    exact
                    path="/edit/:board_id/:sticky_id"
                    component={EditStickyNotePage}
                />
                <Route
                    exact
                    path="/create/:board_id"
                    component={EditStickyNotePage}
                />
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
