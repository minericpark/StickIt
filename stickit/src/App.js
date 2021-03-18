import './css/App.css';
import { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import Dashboard from './components/dashboard';
import LoginPage from './components/login_page';
import { AppContext } from './components/user_context';

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
                    <AppContext.Consumer>
                        {(context) =>
                            loggedIn && context.userID ? (
                                <Redirect to="/dashboard" />
                            ) : (
                                <Redirect to="/login" />
                            )
                        }
                    </AppContext.Consumer>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
