import './NavBar.css';
import { useState, useContext } from 'react';
import { FaHome, FaUser } from 'react-icons/fa';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import logo from '../../assets/IAS-logo.png';
import { FaUserCircle } from "react-icons/fa";
import AuthContext from '../../context/AuthContext';
import { IoLogOutOutline,IoGameController } from "react-icons/io5";

const DropdownMenu = ({ userFirstName, userLastName, onLogout }) => {
    return (
        <div className="dropdown-menu">
            <div style={{borderTopLeftRadius:4, borderTopRightRadius:4, backgroundColor:'rgba(30, 215, 13,0.3)', padding:1, paddingLeft:10, paddingRight:10}}>
            <p>Welcome, {userFirstName} {userLastName}</p>
            </div>
            <div style={{borderBottomLeftRadius:4, borderBottomRightRadius:4, backgroundColor: 'rgba(30, 215, 13,0.3)',padding:0, paddingLeft:10, paddingRight:10, alignContent:'center', marginTop:4}}>
            <button onClick={onLogout} style={{textAlign:'center', fontSize:16, marginTop:1, marginRight:5, paddingLeft:50, paddingRight:50}} className="logoutButton">
            <IoLogOutOutline style={{height:20, width:20, alignItems:'center', marginRight:10, marginBottom:-4, position:'relative'}} />

             Log out
            </button>
            </div>
        </div>
    );
};

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);

    const isLoggedIn = user !== null;

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <>
        <div className='navbar-container'>
            <div className='navbar'>
                <div className='nav-brand'>
             <a href='/'>
                    <img src={logo} alt='ias' className='nav-brand-img' />
             </a>
                </div>
                <ul className='nav-links'>
                    <li>
                        <a href='/about'>
                            About <IoIosInformationCircleOutline style={{position:'relative' ,top:2.9}} />
                        </a>
                    </li>
                    <li>
                        <a href='/game'>
                            Game <IoGameController style={{position:'relative' ,top:2.9}}/>
                        </a>
                    </li>
                    {isLoggedIn ? (
                        <li className="avatar-dropdown" onClick={toggleDropdown}>
                            <FaUserCircle style={{width:40, height:40}} className='avatar' />
                        </li>
                    ) : (
                        <li>
                            <a href='/login'>
                                Login <FaUser />
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </div>
        <div>
            {showDropdown && isLoggedIn && <DropdownMenu userFirstName={user.first_name} userLastName={user.last_name} onLogout={logout} />}
        </div>
        </>
    );
};

export default Navbar;