import Navbar from '../../components/NavBar/NavBar';
import './AboutUs.css'; // Import your CSS file for styling
import teamImg from '../../assets/team.jpg';
import logo from '../../assets/Integral-Ad-Science.jpg';
import trinityLogo from '../../assets/TrinityLogo.jpg';

const AboutUs = () => {
    return (
        <>
            <Navbar />
            <div className='about-us'>
                <div className='company-info'>
                    <div className='logo-container'>
                        <img src={logo} alt='Company Logo' style={{ height: 200, width: 200 }} />
                        <img src={trinityLogo} alt='Trinity College Logo' style={{ height: 200, width: 200 }} />
                    </div>
                    <h1>Trinity X IAS</h1>
                    <p>
                        Welcome to Trinity X IAS! We are dedicated to providing the best services and solutions for our
                        customers. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
                <div className='team-info'>
                    <h2>Our Team</h2>
                    <p className='team-info-details'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <img src={teamImg} className='team-image' style={{ height: 200, width: 200 }} />
                </div>
                <div className='roles-info'>
                    <h2>Roles</h2>
                    <div className='team-members'>
                        <div className='team-member'>
                            <img src='/path/to/team_member1.png' alt='Team Member 1' />
                            <p>John Doe</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;
