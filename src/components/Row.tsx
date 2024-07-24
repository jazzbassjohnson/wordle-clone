import React from "react";
import Tile, {TileStatusType} from "./Tile";
import styled from "styled-components";

const RowElement = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px 0;
`;

type RowPropsType = {
  guess: string;
  solution: string;
}

type LetterType = {
  letter: string;
  status: TileStatusType;
}

function Row({guess, solution}: RowPropsType) { 

  // parse the guess and solution to determine the status of each letter
  const tiles = Array.from({length: 5}, (_, index): LetterType => {
    let status: TileStatusType = 'empty';

    if (guess[index]){
      if(solution[index] === guess[index]){
        status = 'correct';
      } else if (solution.includes(guess[index])){
        status = 'present';
      } else {
        status = 'absent';
      }
    }

    return {letter: guess[index], status};
  });

  return <RowElement>
      {tiles.map((letter, index) => {
        return <Tile key={letter.letter+letter.status+index} letter={letter.letter} status={letter.status} />
      })}
  </RowElement>;
}

export default Row;

// hard mode:
//green always in same place
// yellow within the guess