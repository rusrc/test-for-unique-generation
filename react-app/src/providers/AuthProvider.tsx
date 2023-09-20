import { createContext, useState } from 'react';

interface IAuth {
    userName: string,
    password: string,
    roles: [string],
    accessToken: string
}

interface IContext {
    auth: IAuth,
    setAuth?: () => void //React.Dispatch<React.SetStateAction<IAuth>>
}

const defaultAuth: IAuth =
{
    userName: '',
    roles: [''],
    password: '',
    accessToken: ''
};

const defaultState: IContext = {
    auth: defaultAuth
}

// 
// TODO any to IContext
const AuthContext = createContext<any>(null);

// https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions
// https://stackoverflow.com/questions/57854111/what-to-set-as-the-providers-value-in-order-to-change-context-from-a-consumer
// Children внутри провайдера
export const AuthProvider  = ({ children }) => {
    const [auth, setAuth] = useState(defaultAuth);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
