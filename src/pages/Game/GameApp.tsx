import { useState } from 'react';
import Menu from './GameMenu';
import Game from './Game';

const App = () => {
  const [inGame, setInGame] = useState(false);
  const [showRestartPrompt, setShowRestartPrompt] = useState(false);

  const startGame = () => {
    setInGame(true);
  };

  const endGame = () => {
    setShowRestartPrompt(true);
  };

  const restartGame = () => {
    setShowRestartPrompt(false);
    // Additional logic to reset game state if needed
  };

  const closeRestartPrompt = () => {
    setShowRestartPrompt(false);
  };

  return (
    <div className="app">
      {inGame ? (
        <Game onGameOver={endGame} />
      ) : (
        <Menu startGame={startGame} />
      )}
    </div>
  );
};

export default App;