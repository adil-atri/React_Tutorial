import React, { useState } from "react";
import Board from "./board";

export default function Game(props) {
  //Initialize variables using state hooks
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setNext] = useState(true);

  //Initialize other variables
  const current = history[stepNumber];
  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const winner = calculateWinner(current.squares);

  let status;

  if (winner) {
    status = "Winner " + winner;
  } else {
    if (stepNumber === 9) {
      status = "It's a tie!";
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
  }

  // handleClick(): handling square click
  // change history, stepNumber, xIsNext if there is no winner and the square is not filled
  function handleClick(i) {
    const hist = history.slice(0, stepNumber + 1);
    const current = hist[hist.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";
    setHistory(hist.concat([{ squares: squares }]));
    setStepNumber(hist.length);
    setNext(!xIsNext);
  }

  // jumpTo(): change stepnumber and xIsNext state variables
  function jumpTo(step) {
    setStepNumber(step);
    setNext(step % 2 === 0);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Get the winner of the game
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
