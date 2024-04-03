
const GameMenu = ({ startGame }) => {
  return (
    <div className="menu">
      <h1>Identify The Brand</h1>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default GameMenu;