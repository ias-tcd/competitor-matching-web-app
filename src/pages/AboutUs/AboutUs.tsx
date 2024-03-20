import Navbar from '../../components/NavBar/NavBar';
import './AboutUs.css';
{
    /*import teamImg from '../../assets/team.jpg';*/
}
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
                    <h1>
                        IAS <span style={{ color: '#1ed70d', fontSize: '20px', textAlign: 'center' }}>X</span> Trinity
                    </h1>
                    <p>
                        Welcome to Trinity X IAS! Integral Ad Science (IAS) is a leading global digital advertising
                        technology company. Their service provides data that ensures ads are placed in suitable
                        environments. This project was thought of by our clients in IAS - Ravi Yadav and Paulo DaCosta,
                        machine learning and data science experts. This project was then assigned to a team of talented
                        Trinity College students.
                    </p>
                </div>
                <div className='goal-info' style={{ backgroundImage: 'url(teamImg)' }}>
                    <h2>Our Goal</h2>
                    <p className='goal-info-details'>
                        The aim of our system is to ensure that our brand messages are strategically placed, minimising
                        visibility alongside content related to our competitors. This allows to reduce the risks of
                        competitor exposure and resource drain for our clients.
                        {/*<img src={teamImg} className='team-image' style={{ height:200,width:200}} />*/}
                    </p>
                </div>
                <h2>Meet the Team</h2>
                <div className='roles-info'>
                    <div className='team-members'>
                        <div className='team-member'>
                            <p style={{ visibility: 'visible' }}>Team Lead</p>
                            <img src={logo} alt='Team Member 1' />
                            <p style={{ marginTop: -8 }}>Sam</p>
                        </div>
                    </div>

                    <div className='team-members'>
                        <div className='team-member'>
                            <p>UI Team</p>
                            <img src={logo} alt='Team Member 1' />
                            <p style={{ marginTop: -8 }}>
                                Amy<br></br>
                            </p>
                            <img src={logo} alt='Team Member 1' />
                            <p style={{ marginTop: -8 }}>Beni</p>
                        </div>
                    </div>

                    <div className='team-members'>
                        <div className='team-member'>
                            <p>API Team</p>
                            <img src={logo} alt='Team Member 1' />
                            <p style={{ marginTop: -8 }}>
                                Eva<br></br>
                            </p>
                            <img src={logo} alt='Team Member 1' />
                            <p style={{ marginTop: -8 }}>Dhruv</p>
                        </div>
                    </div>

                    <div className='team-members'>
                        <div className='team-member'>
                            <p>Model Team</p>
                            <img src={logo} alt='Team Member 1' />
                            <p style={{ marginTop: -8 }}>
                                Temi<br></br>
                            </p>
                            <img src={logo} alt='Team Member 1' />
                            <p style={{ marginTop: -8 }}>
                                Fintan<br></br>
                            </p>
                            <img src={logo} alt='Team Member 1' />
                            <p style={{ marginTop: -8 }}>Tuathal</p>
                        </div>
                    </div>

                    <div className='team-members'>
                        <div className='team-member'>
                            <p>Data Team</p>
                            <img src={logo} alt='Team Member 1' />
                            <p style={{ marginTop: -8 }}>
                                Darragh<br></br>
                            </p>
                            <img src={logo} alt='Team Member 1' />
                            <p style={{ marginTop: -8 }}>
                                Hanna<br></br>
                            </p>
                            <img src={logo} alt='Team Member 1' />
                            <p style={{ marginTop: -8 }}>Peng</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;
