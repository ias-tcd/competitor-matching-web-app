import '../../shared/styles/Login-SignUp.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <div className='wrapper'>
            <form action=''>
                <h1>Login</h1>
                <div className='input-box'>
                    <input type='text' placeholder='Username' required />
                    <FaUser className='icon' />
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='Password' required />
                    <FaLock className='icon' />
                </div>

                <button id='Sign-up-btn' type='submit'>
                    <Link to='/'>Login</Link>
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
