import './Navbar.css';
import { FaHome, FaUser } from 'react-icons/fa';

const Navbar = () => {
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

export default Navbar;
