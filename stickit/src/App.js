import './css/App.css';
import { useContext, useEffect } from 'react';
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
    const { userID } = useContext(AppContext);

    useEffect(() => {
        localStorage.setItem('userID', userID);
    }, [userID]);

    return (
        <Router>
            <Switch>
                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>
                <Route exact path="/login">
                    <LoginPage />
                </Route>
                <Route exact path="/">
                    {userID ? (
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
