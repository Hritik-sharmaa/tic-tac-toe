import React, { useEffect } from "react";
import { useState } from "react";

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");

  useEffect(() => {
    if (!getWinnerResults(squares) && squares.every((item) => item !== "")) {
      setCurrentStatus(`The game is DRAW, Please! restart game.`);
    } else if (getWinnerResults(squares)) {
      setCurrentStatus(
        `The Winner is ${getWinnerResults(squares)}. Please! restart game.`
      );
    } else {
      setCurrentStatus(`Next player turn is ${isXTurn ? "X" : "O"}`);
    }
  }, [squares, isXTurn]);

  function Square({ value, onClick }) {
    return (
      <button className="square" onClick={onClick}>
        {value}
      </button>
    );
  }
  //  0 1 2
  //  3 4 5
  //  6 7 8

  function getWinnerResults(squares) {
    const winnerValue = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winnerValue.length; i++) {
      const [x, y, z] = winnerValue[i];
      if (
        squares[x] &&
        squares[x] === squares[y] &&
        squares[x] === squares[z]
      ) {
        return squares[x];
      }
    }
    return null;
  }

  function handleClick(getCurrentValue) {
    const copyArray = [...squares];
    if (getWinnerResults(copyArray) || copyArray[getCurrentValue]) return;
    copyArray[getCurrentValue] = isXTurn ? "X" : "O";
    setIsXTurn(!isXTurn);
    setSquares(copyArray);
  }

  function handleRestartClick() {
    setSquares(Array(9).fill(""));
    setCurrentStatus("");
    setIsXTurn(false);
  }

  return (
    <div className="tic-tac-toe-container">
      <div className="row">
        <Square value={squares[0]} onClick={() => handleClick(0)}></Square>
        <Square value={squares[1]} onClick={() => handleClick(1)}></Square>
        <Square value={squares[2]} onClick={() => handleClick(2)}></Square>
      </div>

      <div className="row">
        <Square value={squares[3]} onClick={() => handleClick(3)}></Square>
        <Square value={squares[4]} onClick={() => handleClick(4)}></Square>
        <Square value={squares[5]} onClick={() => handleClick(5)}></Square>
      </div>

      <div className="row">
        <Square value={squares[6]} onClick={() => handleClick(6)}></Square>
        <Square value={squares[7]} onClick={() => handleClick(7)}></Square>
        <Square value={squares[8]} onClick={() => handleClick(8)}></Square>
      </div>
      <h1>{currentStatus}</h1>
      <button onClick={handleRestartClick}>Restart</button>
    </div>
  );
};

export default TicTacToe;
