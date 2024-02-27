import '../../shared/styles/Login-SignUp.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { CiUser } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
    return (
        <div className='wrapper'>
            <form action=''>
                <h1>Sign Up</h1>
                <div className='input-box'>
                    <input type='text' placeholder='Name' required />
                    <CiUser className='icon' />
                </div>
                <div className='input-box'>
                    <input type='text' placeholder='Username' required />
                    <FaUser className='icon' />
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='Password' required />
                    <FaLock className='icon' />
                </div>

                <button id='Sign-up-btn' type='submit'>
                    <Link to='/'>Sign Up</Link>
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