import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import Dashboard from './components/dashboard';
import LoginPage from './components/login_page';

function App() {
    let loggedIn = false;

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
