import React from 'react';
import Row from './Row';


type BoardProps = {
  guesses: string[];
  solution: string;
};

const Board: React.FC<BoardProps> = ({guesses, solution}) => {
    return (
        <div>
            <div>
                {guesses.map((guess, index) => {
                    return <Row key={index} guess={guess} solution={solution}/>
                })}
            </div>
        </div>
    )
}

export default Board;