import { useState, useEffect, useCallback } from 'react';
import './Game.css';
import AsicsLogo from '../../assets/Car brands/Asics.webp';
import BMWLogo from '../../assets/Car brands/BMW.jpg';
import AudiLogo from '../../assets/Car brands/Audi.png';
import BugattiLogo from '../../assets/Car brands/Bugatti_Chiron_1.jpg';
import LamborghiniLogo from '../../assets/Car brands/Lamborghini.jpg';
import LouisVuittonLogo1 from '../../assets/Car brands/LouisVuitton.jpg';
import LouisVuittonLogo2 from '../../assets/Car brands/LouisVuitton2.jpg';
import RalphLaurenLogo from '../../assets/Car brands/Ralph lauren.jpg';
import RenaultLogo from '../../assets/Car brands/Renault.webp';
import TommyHilfigerLogo from '../../assets/Car brands/Tommy Hilfiger.webp';
import ToyotaLogo from '../../assets/Car brands/Toyota.webp';
import AdidasLogo1 from '../../assets/Car brands/adidas.jpg';
import AdidasLogo2 from '../../assets/Car brands/adidas.jpg';
import AmazonLogo from '../../assets/Car brands/amazon.png';
import BentleyLogo from '../../assets/Car brands/bentley.jpg';
import ChanelLogo from '../../assets/Car brands/chanel.jpg';
import ConverseLogo from '../../assets/Car brands/converse.jpg';
import GoogleLogo from '../../assets/Car brands/google.jpeg';
import GucciLogo1 from '../../assets/Car brands/gucci.webp';
import GucciLogo2 from '../../assets/Car brands/gucci2.webp';
import HyundaiLogo from '../../assets/Car brands/hyundai.jpeg';
import LexusLogo from '../../assets/Car brands/lexus.jpg';
import LululemonLogo from '../../assets/Car brands/lululemon.jpg';
import MercedesLogo from '../../assets/Car brands/Mercedes.jpg';
import MitsubishiLogo from '../../assets/Car brands/mitsubishi.jpg';
import NewBalanceLogo1 from '../../assets/Car brands/newbalence.avif';
import NewBalanceLogo2 from '../../assets/Car brands/newbalence2.jpeg';
import PumaLogo from '../../assets/Car brands/puma.avif';
import ReebokLogo1 from '../../assets/Car brands/reebok.jpg';
import ReebokLogo2 from '../../assets/Car brands/reebok2.jpg';
import SpotifyLogo from '../../assets/Car brands/spotify.webp';
import TaytoLogo from '../../assets/Car brands/tayto.jpg';
import TwitterLogo from '../../assets/Car brands/twitter.jpeg';
import UnderArmourLogo from '../../assets/Car brands/underarmor.webp';
import VansLogo from '../../assets/Car brands/vans.jpg';

import kappa from '../../assets/Car brands/Kappa.webp';
import fendi from '../../assets/Car brands/Fendi.jpeg';
import givenchi from '../../assets/Car brands/Givenchy.jpeg';
import versace from '../../assets/Car brands/Versace.webp';
import lacoste from '../../assets/Car brands/Lacoste.webp';
import slazenger from '../../assets/Car brands/slazenger.jpeg';
import rolex from '../../assets/Car brands/Rolex.png';

const brands = [
    { name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
    { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { name: 'Google', logo: GoogleLogo },
    { name: 'Amazon', logo: AmazonLogo },
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
    { name: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' },
    { name: 'Twitter', logo: TwitterLogo },
    // Car Brands
    { name: 'Bugatti', logo: BugattiLogo },
    { name: 'Lamborghini', logo: LamborghiniLogo },
    { name: 'Lexus', logo: LexusLogo },
    { name: 'Mercedes', logo: MercedesLogo },
    { name: 'Renault', logo: RenaultLogo },
    { name: 'Toyota', logo: ToyotaLogo },
    { name: 'BMW', logo: BMWLogo },
    { name: 'Bentley', logo: BentleyLogo },
    { name: 'Audi', logo: AudiLogo },
    { name: 'Hyundai', logo: HyundaiLogo },
    { name: 'Mitsubishi', logo: MitsubishiLogo },

    // Sports Brands
    { name: 'Adidas', logo: AdidasLogo1 },
    { name: 'Adidas', logo: AdidasLogo2 },
    { name: 'Puma', logo: PumaLogo },
    { name: 'Under Armour', logo: UnderArmourLogo },
    { name: 'Reebok', logo: ReebokLogo1 },
    { name: 'Reebok', logo: ReebokLogo2 },
    { name: 'New Balance', logo: NewBalanceLogo1 },
    { name: 'New Balance', logo: NewBalanceLogo2 },
    { name: 'ASICS', logo: AsicsLogo },
    { name: 'Converse', logo: ConverseLogo },
    { name: 'Vans', logo: VansLogo },
    { name: 'Lululemon', logo: LululemonLogo },
    // Clothing Brands
    { name: 'Gucci', logo: GucciLogo1 },
    { name: 'Gucci', logo: GucciLogo2 },
    { name: 'Louis Vuitton', logo: LouisVuittonLogo1 },
    { name: 'Louis Vuitton', logo: LouisVuittonLogo2 },
    { name: 'Chanel', logo: ChanelLogo },
    { name: 'Ralph Lauren', logo: RalphLaurenLogo },
    { name: 'Tommy Hilfiger', logo: TommyHilfigerLogo },

    { name: 'Spotify', logo: SpotifyLogo },
    { name: 'Tayto', logo: TaytoLogo },
    { name: 'Fendi', logo: fendi },
    { name: 'Rolex', logo: rolex },
    { name: 'Slazenger', logo: slazenger },
    { name: 'Givenchi', logo: givenchi },
    { name: 'Lacoste', logo: lacoste },
    { name: 'Kappa', logo: kappa },
    { name: 'Versace', logo: versace },
];

const Game = () => {
    const [currentBrand, setCurrentBrand] = useState<{ name: string; logo?: string }>({ name: '', logo: '' });
    const [userGuess, setUserGuess] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(45);
    const [guessedBrands, setGuessedBrands] = useState<{ name: string; logo?: string | undefined }[]>([]);
    const [guessStatus, setGuessStatus] = useState('');

    const chooseRandomBrand = useCallback(() => {
        let randomBrand;
        do {
            randomBrand = brands[Math.floor(Math.random() * brands.length)];
        } while (guessedBrands.includes(randomBrand)); // Ensure the brand is not in guessedBrands
        return randomBrand;
    }, [guessedBrands]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        const resetGame = () => {
            setScore(0);
            setTimeLeft(45);
            setGuessedBrands([]);
            setCurrentBrand(chooseRandomBrand());
        };

        if (timeLeft === -1) {
            clearInterval(timer);
            alert("Time's up! Your score: " + score);
            resetGame();
        }

        return () => clearInterval(timer);
    }, [timeLeft, score, chooseRandomBrand]);

    useEffect(() => {
        setCurrentBrand(chooseRandomBrand());
    }, [chooseRandomBrand]);

    const handleGuess = useCallback(() => {
        if (userGuess.toLowerCase() === currentBrand.name.toLowerCase()) {
            setScore(score + 1);
            setUserGuess('');
            setGuessedBrands([...guessedBrands, currentBrand]);
            setCurrentBrand(chooseRandomBrand());
            setGuessStatus('correct');
            setTimeout(() => setGuessStatus(''), 1000);
        } else {
            setUserGuess('');
            setGuessStatus('incorrect');
            setTimeout(() => setGuessStatus(''), 1000);
        }
    }, [userGuess, currentBrand, score, guessedBrands, chooseRandomBrand]);

    useEffect(() => {
        const handleKeyUp = (event: { key: string }) => {
            if (event.key === 'Enter') {
                handleGuess();
            }
        };

        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleGuess]);

    return (
        <div className='container'>
            <div className='scoreboard'>
                <p style={{ color: '#57c290', marginRight: 60 }}>
                    <span style={{ textDecoration: 'underline', color: '#57c290', fontSize: 15 }}>
                        {' '}
                        TIME LEFT<br></br>
                    </span>{' '}
                    <span style={{ color: 'WHITE', textDecoration: 'hidden', fontSize: 40 }}>{timeLeft}</span>
                </p>
                <p style={{ color: '#57c290' }}>
                    <span style={{ textDecoration: 'underline', color: '#57c290', fontSize: 15 }}>
                        YOUR SCORE<br></br>{' '}
                    </span>
                    <span
                        style={{ fontSize: 40 }}
                        className={guessStatus === 'correct' ? 'score-correct' : guessStatus === 'incorrect' ? '' : ''}
                    >
                        {score}
                    </span>
                </p>
            </div>

            <div>
                <img
                    className='brand-logo'
                    src={currentBrand.logo}
                    alt='Brand Logo'
                    style={{ width: 300, height: 300 }}
                />
            </div>
            <div>
                <input
                    type='text'
                    id='gameInput'
                    placeholder='Identify the brand'
                    value={userGuess}
                    onChange={e => setUserGuess(e.target.value)}
                    className={
                        guessStatus === 'correct'
                            ? 'correct-guess'
                            : guessStatus === 'incorrect'
                              ? 'score-incorrect'
                              : ''
                    }
                    style={{
                        borderColor: guessStatus === 'correct' ? 'green' : guessStatus === 'incorrect' ? 'red' : '',
                    }}
                />
                <button onClick={handleGuess}>Enter</button>
            </div>
        </div>
    );
};

export default Game;
