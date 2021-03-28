import { createContext, useState } from 'react';

const AppContext = createContext();

/** Provides the context
 *
 * @param {string} userID the user currently logged in
 * @param {*} children the provider's child components
 * @returns
 */
function AppProvider({ userID, children }) {
    const [state, setState] = useState({
        userID: userID,
        login: (user) => setState({ ...state, userID: user }),
        logout: () => setState({ ...state, userID: null }),
    });

    return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
