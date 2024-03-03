import { useState } from "react";

const initalGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({  /*activePlayerSymbol*/ onSelectSquare, turns }) {

  let gameBoard = initalGameBoard;

  for(const turn of turns) {
    const {square, player} = turn; //turns 구조분해
    const {row, col} = square; // square 구조분해

    gameBoard[row][col] = player;
  }

 /* const [gameBoard, setGameBoard] = useState(initalGameBoard);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
        const updateBoard = [...prevGameBoard.map(innerArray => [...innerArray])]; // 스프레드(...) : 새로운 배열 객체로 복붙해서 만들어줌
        updateBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updateBoard;
    });
    onSelectSquare();
  }
*/
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
