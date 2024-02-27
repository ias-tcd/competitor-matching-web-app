import { FaHome, FaUser } from 'react-icons/fa';
import './NavBar.css';

const NavBar = () => {
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
            </ul>
        </div>
    );
};

export default NavBar;
