import { useState } from 'react';
import Board from "./Board";
import { calculateWinner } from './CalculareWinner';

export default function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];

    const winner = calculateWinner(currentSquares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setXIsNext(!xIsNext);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }

        return (
            <li key={ move }>
                <button onClick={ () => jumpTo(move) }>{ description }</button>
            </li>
        );
    }); 

    return (
        <div className="game">
            <h2>{ status }</h2>
            <div className="game-board">
                <Board xIsNext={ xIsNext } squares={ currentSquares } onPlay={ handlePlay } winner = { winner }/>
            </div>
            <div className="game-info">
                <ol>{ moves }</ol>
            </div>
        </div>
    )
}