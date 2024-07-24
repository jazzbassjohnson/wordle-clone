import React, { useEffect, useState } from 'react';
import Board from './Board';
import { validateWord } from '../utils/api';

// Function to get a random word from a list of words
const getRandomWord = () => {
  const WORD_LIST = ['apple', 'brick', 'crane', 'drape'];
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)].toUpperCase();
};

const Wordle: React.FC = () => {
  // Setup game state
  const [solution, setSolution] = useState(getRandomWord());
  const [guesses, setGuesses] = useState<string[]>(Array(7).fill(''));
  const [currentGuess, setCurrentGuess] = useState('');
  const [message, setMessage] = useState('');
  const [isWinner, setIsWinner] = useState(false); // dont' need
  const [isGameOver, setIsGameOver] = useState(false);

  // Clear message when guesses or solution change
  useEffect(() => {
    setMessage('');
  }, [guesses, solution]);

  // Refresh the game
  const refreshGame = () => {
    setSolution(getRandomWord());
    setGuesses(Array(7).fill(''));
    setCurrentGuess('');
    setMessage('');
    setIsWinner(false);
    setIsGameOver(false);
  };

  const isValidHardModeGuess = (guesses: string[], currentGuess: string)=> {
    const newGuesses = [...guesses];
    const emptyIndex = newGuesses.findIndex(guess => guess === '');
    if (emptyIndex === 0 ){
      return true;
    }

    const lastGuess = newGuesses[emptyIndex - 1];
    
    for (let index = 0; index <= 5; index++){ // (SOLUTION: DRAPE) BRICK  ---> CRANE 
      if(solution[index] === lastGuess[index] && lastGuess[index] !== currentGuess[index]){
        return false;
      } else if (solution.includes(lastGuess[index]) && !currentGuess.includes(lastGuess[index])){ 
        return false;
      }
    }

    return true;
  }

  // Validate the current guess
  const handleGuess = async () => {
    if (isGameOver || currentGuess.length !== 5) {
      setMessage(currentGuess.length !== 5 ? 'Word must be 5 characters long' : message);
      return;
    }

    if (guesses.includes(currentGuess)) {
      setMessage('You already guessed that word');
      return;
    }

    // hard mode begins...
    if (!isValidHardModeGuess(guesses, currentGuess)){
      setMessage('Word does not pass hard mode rules...')
      return;
    }

    const isValid = await validateWord(currentGuess);
    if (isValid) {
      const newGuesses = [...guesses];
      const emptyIndex = newGuesses.findIndex(guess => guess === '');
      if (emptyIndex !== -1) {
        newGuesses[emptyIndex] = currentGuess;
        setGuesses(newGuesses);
      }
  
      if (currentGuess === solution) {
        setMessage('You win!');
        setIsWinner(true);
        setIsGameOver(true);
      } else if (newGuesses.filter(guess => guess !== '').length >= 7) {
        setMessage(`Game over! The word was ${solution}`);
        setIsGameOver(true);
      }
    } else {
      setMessage('Not a valid word');
    }
    setCurrentGuess('');
  };

  // Handle key press event
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGuess();
    }
  };

  return (
    <div>
      <h1>Wordle Clone</h1>
      <Board guesses={guesses} solution={solution} />
      <p>
        {message}
        {isGameOver && <button onClick={refreshGame}>New Game</button>}
      </p>
      <input
        type="text"
        maxLength={5}
        value={currentGuess}
        onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
        onKeyDown={handleKeyPress}
        disabled={isGameOver}
      />
      <button disabled={isGameOver} onClick={handleGuess}>Enter</button>
    </div>
  );
};

export default Wordle;
