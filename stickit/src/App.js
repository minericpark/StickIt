import './css/App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import Dashboard from './components/dashboard';
import LoginPage from './components/login_page';
import { useState } from 'react';

function App() {
    const [loggedIn, toggleLoggedIn] = useState(false);

    return (
        <Router>
            <Switch>
                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>
                <Route exact path="/login">
                    <LoginPage toggleLoggedIn={toggleLoggedIn} />
                </Route>
                <Route exact path="/">
                    {loggedIn ? (
                        <Redirect to="/dashboard" />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
