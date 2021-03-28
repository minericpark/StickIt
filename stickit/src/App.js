import './css/App.css';
import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import Dashboard from './components/dashboard';
import LoginPage from './components/login_page';
import { AppContext } from './components/user_context';
import MenuBar from "./components/menu_bar";
import TestPage from "./components/test_page";
import CreateAccount from "./components/create_account_page";

function App() {
    const { userID } = useContext(AppContext);

    useEffect(() => {
        localStorage.setItem('userID', userID);
    }, [userID]);

    return (
        <Router>
            { userID ? <MenuBar /> : null}
            <Switch>
                <Route exact path="/test" component={TestPage}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/create-account" component={CreateAccount}/>
                <Route exact path="/">
                    {userID ? (
                        <Redirect to="/dashboard" />
                    ) : (
                        // TODO: change this to rendering the landing page
                        <Redirect to="/create-account" />
                    )}
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
