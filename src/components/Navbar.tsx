import { Link } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file for styling

const Navbar = () => {
    return (
        <nav className='navbar'>
            <ul className='nav-links'>
                <li>
                    <Link to='/'>Home</Link>
                </li>

                <li>
                    <Link to='/Login'>Sign In</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
