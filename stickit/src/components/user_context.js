import { createContext, useState } from 'react';

const AppContext = createContext();

function AppProvider({ userID, children }) {
    const [state, setState] = useState({
        userID: userID,
        login: (user) => setState({ ...state, userID: user }),
        logout: () => setState({ ...state, userID: null }),
    });

    return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
