import './NavBar.css';
import { useContext } from 'react';
import { FaHome, FaUser } from 'react-icons/fa';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import logo from '../../assets/IAS-logo.png';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
    const { logout } = useContext(AuthContext);

    return (
        <div className='navbar'>
            <div className='nav-brand'>
                <img src={logo} alt='ias' className='nav-brand-img' />
            </div>
            <ul className='nav-links'>
                <li>
                    <a href='/'>
                        Home <FaHome />
                    </a>
                </li>
                <li>
                    <a href='/about'>
                        About <IoIosInformationCircleOutline />
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

export default Navbar;
