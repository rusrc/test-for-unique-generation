import { createContext, useState } from 'react';

interface IAuth {
    userName: string,
    password: string,
    roles: [],
    accessToken: string
}

interface IContext {
    auth: IAuth,
    setAuth?: () => void //React.Dispatch<React.SetStateAction<IAuth>>
}

const defaultAuth: IAuth =
{
    accessToken: '',
    password: '',
    roles: [],
    userName: ''
};

const defaultState: IContext = {
    auth: defaultAuth
}


// TODO any to IContext
const AuthContext = createContext<any>({});

// Children внутри провайдера
export const AuthProvider = ({ children }: any) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
