import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './components/context/user_context';

let userID = localStorage.getItem('userID');
if (userID === 'null') userID = null;

ReactDOM.render(
    <React.StrictMode>
        <UserProvider userID={userID}>
            <App />
        </UserProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
