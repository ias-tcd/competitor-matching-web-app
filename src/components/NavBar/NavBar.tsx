import './NavBar.css';
import { FaHome, FaUser } from 'react-icons/fa';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import logo from '../../assets/IAS-logo.png';

const Navbar = () => {
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
            </ul>
        </div>
    );
};

export default Navbar;
