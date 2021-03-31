import { createContext, useState } from 'react';

const UserContext = createContext();

/** Provides the context
 *
 * @param {string} userID the user currently logged in
 * @param {*} children the provider's child components
 * @returns
 */
function UserProvider({ userID, children }) {
    const [state, setState] = useState({
        userID: userID,
        login: (user) => setState({ ...state, userID: user }),
        logout: () => setState({ ...state, userID: null }),
    });

    return (
        <UserContext.Provider value={state}>{children}</UserContext.Provider>
    );
}

export { UserContext, UserProvider };
