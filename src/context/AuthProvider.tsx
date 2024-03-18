import axios from 'axios';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { TokenClaims } from '../types/interfaces';
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

    const navigate = useNavigate();

    const login = useCallback(
        async (email: string, password: string) => {
            setLoading(true);
            try {
                const { status, data } = await axios.post(`${process.env.VITE_APP_API_URL}/accounts/login/`, {
                    email,
                    password,
                });
                if (status === 200) {
                    setTokens(data);
                    setUser(jwtDecode(data.access));
                    localStorage.setItem('tokens', JSON.stringify(data));
                    navigate('/');
                }
            } catch (err) {
                console.error(`Error in logging in: ${err}`);
            }
            setLoading(false);
        },
        [navigate],
    );

    const register = async (payload: {
        first_name: string;
        last_name: string;
        password: string;
        confirm_password: string;
        email: string;
    }) => {
        try {
            await axios.post(`${process.env.VITE_APP_API_URL}/accounts/register/`, payload);
        } catch (err) {
            console.error(`Error in registering: ${err}`);
        }
    };

    const logout = () => {
        setLoading(true);
        setTokens(null);
        setUser(null);
        localStorage.removeItem('tokens');
        setLoading(false);
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
        }),
        [tokens, user, login],
    );

    return <AuthContext.Provider value={context}>{loading ? null : children}</AuthContext.Provider>;
};

export default AuthProvider;
