import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
    const { user } = useContext(AuthContext);

    return user ? <Outlet /> : <Navigate to='/login' />;
};

export default AuthGuard;
