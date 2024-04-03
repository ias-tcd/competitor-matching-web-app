import  { useState, useEffect } from 'react';
import './Game.css'
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
import MercedesLogo from '../../assets/Car brands/mercedes.jpg';
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
  { name: 'Tayto', logo: TaytoLogo }
];

const Game = () => {
  const [currentBrand, setCurrentBrand] = useState("");
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [highScore, setHighScore] = useState(
    localStorage.getItem('highScore') || 0
  );
      const [guessStatus, setGuessStatus] = useState('');


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    if (timeLeft === -1) {
      clearInterval(timer);
      alert('Time\'s up! Your score: ' + score);
      resetGame();
    }

    return () => clearInterval(timer);
  }, [timeLeft, score]);

  useEffect(() => {
    setCurrentBrand(chooseRandomBrand());
  }, []);

  const chooseRandomBrand = () => {
    return brands[Math.floor(Math.random() * brands.length)];
  };

  const handleGuess = () => {
        if (userGuess.toLowerCase() === currentBrand.name.toLowerCase()) {
            setScore(score + 1);
            setUserGuess('');
            setCurrentBrand(chooseRandomBrand());
            setGuessStatus('correct');
            setTimeout(() => setGuessStatus(''), 1000); // Reset guess status after 1 second
        } else {
            setUserGuess('');
            setGuessStatus('incorrect');
            setTimeout(() => setGuessStatus(''), 1000); // Reset guess status after 1 second
        }
    };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(60);
    setCurrentBrand(chooseRandomBrand());
  };

  useEffect(() => {
    const handleKeyUp = (event) => {
      if (event.key === "Enter") {
        handleGuess();
      }
    };

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleGuess]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score);
    }
  }, [score, highScore]);

  return (
    <div className="container">
      <div className="scoreboard">
        <p style={{color:'black'}}>Time Left: <span style={{color:'#f1356d'}}>{timeLeft} seconds</span></p>
        <p style={{color:'black'}}>Score: <span className={guessStatus === 'correct' ? 'score-correct' : guessStatus === 'incorrect' ? '' : ''}>
        {score}
        </span>
        </p>
      </div>
       <div className="high-score"><span style={{color:'black'}}>High Score:</span> {highScore}</div>
      <div>
        <img className="brand-logo" src={currentBrand.logo} alt="Brand Logo" style={{width:300, height:300}} />
      </div>
      <div>
        <input
          type="text"
          placeholder="Identify the brand"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          className={guessStatus === 'correct' ? 'correct-guess' : guessStatus === 'incorrect' ? 'score-incorrect' : ''}
          style={{ borderColor: guessStatus === 'correct' ? 'green' : guessStatus === 'incorrect' ? 'red' : '' }}
        />
        <button onClick={handleGuess}>Enter</button>
      </div>
    </div>
  );
};

export default Game;