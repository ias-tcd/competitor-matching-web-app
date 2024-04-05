import { useState } from 'react';
import './GameMenu.css';
import detective from '../../assets/GameMenu/Detective.gif';
import box from '../../assets/GameMenu/mario.gif';

const InstructionDialog = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className='instruction-dialog'>
            <div className='modal-content'>
                <span className='close' onClick={onClose}>
                    &times;
                </span>
                <h2>How to Play</h2>
                <p style={{ fontSize: 18, lineHeight: 2 }}>
                    <br></br>The objective is to identify the brand logo displayed on the screen.<br></br> Type your
                    guess in the input box and press Enter.<br></br> If your guess is correct, your score will increase.
                    <br></br> You have 60 seconds to guess as many logos as you can.<br></br>
                    <br></br>
                    <span
                        style={{
                            background: 'linear-gradient(45deg, #ff00ff, #00ffff, #ff00ff)',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Good luck!
                    </span>
                </p>
            </div>
        </div>
    );
};

const GameMenu = ({ startGame }: { startGame: () => void }) => {
    const [showInstructionDialog, setShowInstructionDialog] = useState(false);

    const handleStartGame = () => {
        startGame();
    };

    const handleOpenInstructionDialog = () => {
        setShowInstructionDialog(true);
    };

    const handleCloseInstructionDialog = () => {
        setShowInstructionDialog(false);
    };

    return (
        <div className='menu'>
            <div className='detective-container'>{/* Add detective image here */}</div>
            <div className='animated-text'>
                <h1>Identify The Brand</h1>
            </div>
            <button onClick={handleStartGame}>Start Game</button>
            <button onClick={handleOpenInstructionDialog}>Instructions</button>
            {showInstructionDialog && <InstructionDialog onClose={handleCloseInstructionDialog} />}

            <div className='detective' style={{ display: 'flex' }}>
                <img src={box} className='box1' style={{ height: 75, width: 75, marginRight: 200, marginTop: 100 }} />
                <img src={detective} style={{ height: 300, width: 300 }} />
            </div>
        </div>
    );
};

export default GameMenu;
