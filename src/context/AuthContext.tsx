import { createContext } from 'react';
import { TokenClaims, Tokens } from '../types/interfaces';

export interface IAuthContext {
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
    loginError: string | null;
    registerError: string | null;
    handleChangedTokens: (tokens: Tokens) => void;
}

const AuthContext = createContext<IAuthContext>({
    user: null,
    tokens: null,
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    logout: () => {},
    loginError: '',
    registerError: '',
    handleChangedTokens: () => {},
});

export default AuthContext;
