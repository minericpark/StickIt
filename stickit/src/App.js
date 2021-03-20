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

function App() {
    const { userID } = useContext(AppContext);

    useEffect(() => {
        localStorage.setItem('userID', userID);
    }, [userID]);

    return (
        <Router>
            { userID != null? <MenuBar /> : null}
            <Switch>
                <Route exact path="/test" component={TestPage}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/">
                    {userID ? (
                        <Redirect to="/dashboard" />
                    ) : (
                        // TODO: change this to rendering the landing page
                        <Redirect to="/login" />
                    )}
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
