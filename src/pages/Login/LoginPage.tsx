import React, { useContext, useState } from 'react';
import '../../shared/styles/Login-SignUp.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const LoginPage = () => {
    const { user, login, loginError } = useContext(AuthContext);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
    };

    return user ? (
        <Navigate to='/' />
    ) : (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className='input-box'>
                    <input
                        type='text'
                        placeholder='Email'
                        required
                        id='email'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                    <FaUser className='icon' />
                </div>
                <div className='input-box'>
                    <input
                        type='password'
                        placeholder='Password'
                        required
                        id='password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
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
