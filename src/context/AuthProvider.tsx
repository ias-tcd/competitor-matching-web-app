import axios from 'axios';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { TokenClaims, Tokens } from '../types/interfaces';
import AuthContext from './AuthContext';

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [tokens, setTokens] = useState(() =>
        localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens') as string) : null,
    );
    const [user, setUser] = useState<TokenClaims | null>(() => (tokens ? jwtDecode(tokens.access) : null));
    const [loading, setLoading] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [registerError, setRegisterError] = useState<string | null>(null);

    const navigate = useNavigate();

    const login = useCallback(
        async (email: string, password: string) => {
            setLoginError('');
            setRegisterError('');
            setLoading(true);
            try {
                const { status, data } = await axios.post(`${process.env.VITE_APP_API_URL}/accounts/login/`, {
                    email,
                    password,
                });
                if (status === 200) {
                    handleChangedTokens(data);
                    navigate('/');
                    setLoading(false);
                }
                setLoginError('Invalid email or password!');
            } catch (err) {
                console.error(`Error in logging in: ${err}`);
                setLoginError('Invalid email or password!');
            }
            setLoading(false);
        },
        [navigate],
    );

    const register = useCallback(
        async (payload: {
            first_name: string;
            last_name: string;
            password: string;
            confirm_password: string;
            email: string;
        }) => {
            setLoading(true);
            setRegisterError('');
            setLoginError('');
            try {
                await axios.post(`${process.env.VITE_APP_API_URL}/accounts/register/`, payload);
                navigate('/login');
            } catch (err) {
                console.error(`Error in registering: ${err}`);
                setRegisterError('Unable to register!');
            }
            setLoading(false);
        },
        [navigate],
    );

    const logout = () => {
        setLoading(true);
        setTokens(null);
        setLoginError('');
        setRegisterError('');
        setUser(null);
        localStorage.removeItem('tokens');
        setLoading(false);
    };

    const handleChangedTokens = (tokens: Tokens | null) => {
        setTokens(tokens);
        setUser(tokens?.access ? jwtDecode(tokens?.access) : null);
        localStorage.setItem('tokens', JSON.stringify(tokens));
    };

    useEffect(() => {
        tokens && setUser(jwtDecode(tokens.access));
        setLoading(false);
    }, [tokens, loading]);

    const context = useMemo(
        () => ({
            user,
            tokens,
            login,
            register,
            logout,
            loginError,
            registerError,
            handleChangedTokens,
        }),
        [tokens, user, login, loginError, registerError, register],
    );

    return <AuthContext.Provider value={context}>{loading ? null : children}</AuthContext.Provider>;
};

export default AuthProvider;
