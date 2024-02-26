import './Login-Register.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { MdPermIdentity } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';

const RegisterUser = () => {
    return (
        <>
            <Navbar />
            <div className='wrapper'>
                <form action=''>
                    <h1>Sign Up</h1>
                    <div className='input-box'>
                        <input type='text' placeholder='Name' required />
                        <MdPermIdentity className='icon' />
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
                        <Link to='/Login'>Sign Up</Link>
                    </button>

                    <div className='register-link'>
                        <p>
                            Already have an account? <Link to='/Login'>Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
};
export default RegisterUser;
