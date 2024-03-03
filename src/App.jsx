import { useState } from "react";

import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Logo from "./components/Logo";
import { WINNING_COMBINATIONS } from "./winning-combinations";

//helper 함수. 데이터를 렌더링 시키는 역할은 안함.
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O"; // 최근에 플레이한 사용자가 X면 O 차례로 바꿔줌
  }

  return currentPlayer;
}

function App() {
  // 상태(state)는 최대한 적게 만들고, 많은 파생되는 연산을 하도록 하는게 좋음.
  //const [activePlayer, setActivePlayer] = useState("X");
  //const [hasWinner, setHasWinner] = useState(false);

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    //setActivePlayer((crrActivePlayer) => (crrActivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updateTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Logo turns={gameTurns} />
    </main>
  );
}

export default App;
