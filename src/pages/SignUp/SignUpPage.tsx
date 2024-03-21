import '../../shared/styles/Login-SignUp.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { CiUser } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const SignUpPage = () => {
    const { registerError, register } = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            first_name: { value: string };
            last_name: { value: string };
            email: { value: string };
            password: { value: string };
            confirm_password: { value: string };
        };
        const payload = {
            first_name: target.first_name.value,
            last_name: target.last_name.value,
            email: target.email.value,
            password: target.password.value,
            confirm_password: target.confirm_password.value,
        };
        await register(payload);
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <div className='input-box'>
                    <input type='text' placeholder='First Name' required id='first_name' />
                    <CiUser className='icon' />
                </div>
                <div className='input-box'>
                    <input type='text' placeholder='Last Name' required id='last_name' />
                    <CiUser className='icon' />
                </div>
                <div className='input-box'>
                    <input type='text' placeholder='Email' required id='email' />
                    <FaUser className='icon' />
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='Password' required id='password' />
                    <FaLock className='icon' />
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='Password' required id='confirm_password' />
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
