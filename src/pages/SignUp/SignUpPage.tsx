import '../../shared/styles/Login-SignUp.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { CiUser } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';

const SignUpPage = () => {
    const { registerError, register } = useContext(AuthContext);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            confirm_password: confirmPassword,
        };
        await register(payload);
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <div className='input-box'>
                    <input
                        type='text'
                        placeholder='First Name'
                        required
                        id='first_name'
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <CiUser className='icon' />
                </div>
                <div className='input-box'>
                    <input
                        type='text'
                        placeholder='Last Name'
                        required
                        id='last_name'
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                    <CiUser className='icon' />
                </div>
                <div className='input-box'>
                    <input
                        type='text'
                        placeholder='Email'
                        required
                        id='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <FaUser className='icon' />
                </div>
                <div className='input-box'>
                    <input
                        type='password'
                        placeholder='Password'
                        required
                        id='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <FaLock className='icon' />
                </div>
                <div className='input-box'>
                    <input
                        type='password'
                        placeholder='Password'
                        required
                        id='confirm_password'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <FaLock className='icon' />
                </div>

                {registerError && <div className='error-message'> {registerError} </div>}

                <button id='Sign-up-btn' type='submit'>
                    Sign Up
                </button>

                <div className='register-link'>
                    <p>
                        Already have an account? <Link to='/login'>Login</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};
export default SignUpPage;