import { useContext } from 'react';
import { FaHome, FaUser } from 'react-icons/fa';
import './NavBar.css';
import AuthContext from '../../context/AuthContext';

const NavBar = () => {
    const { logout } = useContext(AuthContext);

    return (
        <div className='navbar'>
            <div className='nav-brand'>
                <p>IAS</p>
            </div>
            <ul className='nav-links'>
                <li>
                    <a href='/'>
                        Home <FaHome />
                    </a>
                </li>
                <li>
                    <a href='/login'>
                        Login <FaUser />
                    </a>
                </li>
                <li>
                    <button onClick={logout}>Logout</button>
                </li>
            </ul>
        </div>
    );
};

export default NavBar;
