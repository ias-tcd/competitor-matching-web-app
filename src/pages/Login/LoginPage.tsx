import React, { useContext } from 'react';
import '../../shared/styles/Login-SignUp.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const LoginPage = () => {
    const { user, login, loginError } = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
        };
        await login(target.email.value, target.password.value);
    };

    return user ? (
        <Navigate to='/' />
    ) : (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className='input-box'>
                    <input type='text' placeholder='Email' required id='email' />
                    <FaUser className='icon' />
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='Password' required id='password' />
                    <FaLock className='icon' />
                </div>

                {loginError && <div className='error-message'> {loginError} </div>}

                <button id='Sign-up-btn' type='submit'>
                    Login
                </button>

                <div className='register-link'>
                    <p>
                        Don't have an account? <Link to='/signUp'>Sign Up</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};
export default LoginPage;
