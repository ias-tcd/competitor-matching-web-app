import { createContext } from 'react';
import { TokenClaims } from '../types/interfaces';

interface IAuthContext {
    user: TokenClaims | null;
    tokens: {
        access: string;
        refresh: string;
    } | null;
    login: (email: string, password: string) => Promise<void>;
    register: (payload: {
        first_name: string;
        last_name: string;
        password: string;
        confirm_password: string;
        email: string;
    }) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
    user: null,
    tokens: null,
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    logout: () => {},
});

export default AuthContext;
