import { useState } from 'react';
import Menu from './GameMenu';
import Game from './Game';

const App = () => {
    const [inGame, setInGame] = useState(false);

    const startGame = () => {
        setInGame(true);
    };

    return <div className='app'>{inGame ? <Game /> : <Menu startGame={startGame} />}</div>;
};

export default App;
