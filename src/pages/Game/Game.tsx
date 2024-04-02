import  { useState, useEffect } from 'react';
import './Game.css'

const brands = [
  { name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
  { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
  { name: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' },
  { name: 'Coca', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg' },
  
];

const Game = () => {
  const [currentBrand, setCurrentBrand] = useState("");
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    if (timeLeft === 0) {
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
    } else {
      setUserGuess('');
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

  return (
    <div className="container">
      <div className="scoreboard">
        <p>Time Left: {timeLeft} seconds</p>
        <p>Score: {score}</p>
      </div>
      <div className='brand-logo'>
        <img className="brand-logo" src={currentBrand.logo} alt="Brand Logo" style={{width:300, height:300}} />
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter your guess"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
        />
        <button onClick={handleGuess}>Guess</button>
      </div>
    </div>
  );
};

export default Game;