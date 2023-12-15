import React, { useState, useEffect } from 'react'

const Dice = ({ imgD }) => {
  const [players] = useState(['player 1', 'player 2']);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [playerScores, setPlayerScores] = useState({});
  const [dice1, setDice1] = useState(0);
  const [dice2, setDice2] = useState(0);

  useEffect(() => {
    chooseStartingPlayer();
  }, [players]);

  const chooseStartingPlayer = () => {
    const startingPlayerIndex = Math.floor(Math.random() * players.length);
    setCurrentPlayerIndex(startingPlayerIndex);
  };

  useEffect(() => {
    if (currentPlayerIndex !== null) {
      const totalScore = dice1 + dice2;
      const currentPlayer = players[currentPlayerIndex];

      setPlayerScores((prevScores) => ({
        ...prevScores,
        [currentPlayer]: (prevScores[currentPlayer] || 0) + totalScore,
      }));

      switchPlayer();
    }
  }, [dice1, dice2]);

  const rollDice = () => {
    setDice1(Math.ceil(Math.random() * 6));
    setDice2(Math.ceil(Math.random() * 6));
  };

  const switchPlayer = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };


  const resetGame = () => {
    setPlayerScores({});
    setDice1(0);
    setDice2(0);
    chooseStartingPlayer();
  };

  const winner = Object.keys(playerScores).reduce((prevPlayer, currentPlayer) => {
    const prevScore = parseInt(playerScores[prevPlayer], 10) || 0;
    const currentScore = parseInt(playerScores[currentPlayer], 10) || 0;

    return currentScore > prevScore ? currentPlayer : currentScore == prevScore ? null : prevPlayer;
  }, '');

  return (
    <div>

      <header className='w-full h-28 bg-gray-800 flex justify-center items-center'>
        <div className='font-bold text-white text-2xl'>Game</div>
      </header>

      <div className='w-11/12 border border-stone-500 m-auto p-8 mt-7 flex flex-col items-center justify-center space-y-6'>
        <div className=' bg-[#f0ffb2] px-11 py-8 font-bold text-xl text-gray-600'>
          { winner == null ? <p className='text-red-500'>Match null</p>  : <p>{winner} Wins!</p> }    
        </div>
        {players.map((player) => (
          <p key={player}>
            {player} score: <span className='font-bold'>{playerScores[player] || 0}</span>
          </p>
        ))}

        <div className='flex space-x-6'>
          <img src={imgD[dice1]} style={{ width: 60, height: 60 }} alt={`Dice 1`} />
          <img src={imgD[dice2]} style={{ width: 60, height: 60 }} alt={`Dice 2`} />
        </div>


        <div>
          <p>Current Player: <span className='font-bold'>{players[currentPlayerIndex]}</span></p>
          <div className='flex justify-between mt-2'>
            <button onClick={resetGame} className='bg-red-400 px-5 py-2'>Reset</button>
            <button onClick={rollDice} className='bg-[#80ea80] px-5 py-2'>Roll Dice</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dice
