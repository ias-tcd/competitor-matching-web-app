import Navbar from '../../components/NavBar/NavBar';
import './AboutUs.css';
import { useState, useEffect, useRef } from 'react';
import teamImg from '../../assets/team.jpg';
import logo from '../../assets/Integral-Ad-Science.jpg';
import trinityLogo from '../../assets/TrinityLogo.jpg';
import SamPic from '../../assets/Team Members/Sam.jpeg';
import AmyPic from '../../assets/Team Members/Amy.jpeg';
import EvaPic from '../../assets/Team Members/Eva.jpeg';
import DhruvPic from '../../assets/Team Members/Dhruv.jpeg';
import TemiPic from '../../assets/Team Members/Temi.jpeg';
import TuathalPic from '../../assets/Team Members/Tuathal.jpeg';
import DarraghPic from '../../assets/Team Members/Darragh.jpeg';
import FintanPic from '../../assets/Team Members/Fintan.jpeg';
//import HannaPic from '../../assets/Team Members/Sam.jpeg'
//import PengPic from '../../assets/Team Members/Sam.jpeg'
//import BeniPic from '../../assets/Team Members/Sam.jpeg'

import goal from '../../assets/TheGoal.webp';

const AboutUs = () => {
    const cardData = [
        { name: 'Sam', role: 'Team Lead', Pic: SamPic, position: 'Goalkeeper' },
        { name: 'Eva', role: 'API Team', Pic: EvaPic, position: 'Defender,Midfield,Attacker' },
        { name: 'Darragh', role: 'Model Team', Pic: DarraghPic, position: 'Defender,Midfield,Attacker' },
        { name: 'Amy', role: 'UI Designer', Pic: AmyPic, position: 'Defender,Midfield,Attacker' },
        { name: 'Temi', role: 'Data Team', Pic: TemiPic, position: 'Defender,Midfield,Attacker' },
        { name: 'Beni', role: 'UI Designer', Pic: logo, position: 'Defender,Midfield,Attacker' },
        { name: 'Dhruv', role: 'API Team', Pic: DhruvPic, position: 'Defender,Midfield,Attacker' },
        { name: 'Hanna', role: 'Model Team', Pic: logo, position: 'Defender,Midfield,Attacker' },
        { name: 'Tuathal', role: 'Data Team', Pic: TuathalPic, position: 'Defender,Midfield,Attacker' },
        { name: 'Peng', role: 'Model Team', Pic: logo, position: 'Defender,Midfield,Attacker' },
        { name: 'Fintan', role: 'Data Team', Pic: FintanPic, position: 'Defender,Midfield,Attacker' },
    ];

    const [flippedIndex, setFlippedIndex] = useState(-1); // State to keep track of which card to flip
    const cardRef = useRef(null);
    const cardsCount = 11; // Number of cards

    useEffect(() => {
        const handleScroll = () => {
            if (cardRef.current) {
                const top = cardRef.current.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (top < windowHeight) {
                    // Start flipping cards sequentially
                    for (let i = 0; i < cardsCount; i++) {
                        setTimeout(() => {
                            setFlippedIndex(i);
                        }, i * 100); //  Delay time in ms
                    }
                    window.removeEventListener('scroll', handleScroll);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check visibility on initial render

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Navbar />
            <div className='about-us'>
                <div className='about-us-bg'>
                    <div className='about-us-image'>
                        <img src={teamImg} alt='Company Logo' className='team-image' />
                        <div className='about-us-title'>
                            <h1>About Us</h1>
                            <p className='underline'>
                                -----------------------------------------------------------------
                            </p>
                        </div>
                    </div>
                </div>
                <div className='company-info'>
                    <p className='company-info-details'>
                        <h1 style={{ fontSize: 48, paddingBottom: 50, color: '#6EFF29' }}>
                            IAS <span style={{ color: 'darkGreen', fontSize: '40px', textAlign: 'center' }}>&</span>{' '}
                            Trinity
                        </h1>
                        Integral Ad Science (IAS) is a leading global digital advertising technology company. Their
                        service provides data that ensures ads are placed in suitable environments. This project was
                        conceived by our clients in IAS - Ravi Yadav and Paulo DaCosta, machine learning and data
                        science experts. This project was then assigned to a team of talented Trinity College students.
                    </p>
                    <img
                        src={logo}
                        alt='Company Logo'
                        style={{ height: 500, width: '25.65%', mixBlendMode: 'overlay' }}
                    />
                    <img
                        src={trinityLogo}
                        alt='Trinity College Logo'
                        style={{ height: 500, width: '25.65%', mixBlendMode: 'overlay' }}
                    />
                </div>
                <div className='goal-info' style={{}}>
                    <img src={goal} className='goal-image' style={{ height: 500, width: 600 }} />
                    <p className='goal-info-details' style={{ textAlign: 'left' }}>
                        <h2 style={{ color: '#6EFF29', fontSize: 48, paddingBottom: 50 }}>Our Goal</h2>
                        The aim of our system is to ensure that our brand messages are strategically placed, minimising
                        visibility alongside content related to our competitors. This allows to reduce the risks of
                        competitor exposure and resource drain for our clients.
                    </p>
                </div>
                <h2 style={{ fontSize: 48, paddingBottom: 50 }}>Meet the Team</h2>
                <div ref={cardRef} className='team-members'>
                    {cardData.map((data, index) => (
                        <div key={index} className={`card${index <= flippedIndex ? 'Flipped' : ''}`}>
                            <div className='team-member'>
                                <img src={data.Pic} alt={`Team Member ${index + 1}`} />
                                <div className='team-member-name'>
                                    <p style={{}}>{data.name}</p>
                                </div>
                                <div className='team-member-detail'>
                                    <p>{data.role}</p>
                                </div>
                            </div>
                            <div className='backOfCard'>
                                <img src={logo} alt={`IAS card ${index + 1}`} style={{ width: 200, height: 260 }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AboutUs;
