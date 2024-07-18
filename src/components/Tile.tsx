import React from "react";
import styled, {css} from "styled-components";

const TileElement = styled.div<{$status: string}>`
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  font-size: 18px;
  text-transform: uppercase;
  ${props => props.$status === 'empty' && css`
    background-color: white;
    color: black;
  `}

  ${props => props.$status === 'correct' && css`
    background-color: green;
    color: black;
  `}

  ${props => props.$status === 'present' && css`
    background-color: yellow;
    color: black;
  `}

  ${props => props.$status === 'absent' && css`
    background-color: red;
    color: white;
  `}
`;

export type TileStatusType = 'correct' | 'present' | 'absent' | 'empty';

type TileProps = { letter: string, status: TileStatusType };

function Tile({ letter, status }: TileProps) {
  return <TileElement $status={status}>{letter}</TileElement>;
}

export default Tile;