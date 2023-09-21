import { createContext, useState } from 'react';

// TODO any to IContext
const AuthContext = createContext<any>(null);

// https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions
export const AuthProvider  = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
