import { createContext, useState } from 'react';

const AppContext = createContext();

function AppProvider(props) {
    const [state, setState] = useState({
        userID: null,
        login: (user) => setState({ ...state, userID: user }),
        logout: () => setState({ ...state, userID: null }),
    });

    return (
        <AppContext.Provider value={state}>
            {props.children}
        </AppContext.Provider>
    );
}

export { AppContext, AppProvider };
