import React, { useState } from "react";
import winningCombinations from './combinations'
import './styles.css'

const initialBoard = Array(9).fill(null);

function Square({ value, squareClick }) {
    return (
        <button className='square' onClick={squareClick}>
            {value}
        </button>
    )
}


export default function Mine() {
    const [turns, setTurns] = useState([initialBoard]);
    const [currentTurn, setCurrentTurn] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [gameWinner, setGameWinner] = useState(null);

    function handleClick(idx) {
        const nextTurn = currentTurn % 2 === 0 ? "X" : "O";
        let newSquares = turns[currentTurn].slice()
        newSquares[idx] = nextTurn;

        setTurns([...turns, newSquares]);
        setCurrentTurn(currentTurn => currentTurn + 1)
        setXIsNext(nextTurn === "X")

        const winner = hasWinner(newSquares)
        if(hasWinner(newSquares)) {
            setGameWinner(winner)
        }
    }

    function hasWinner(board) {
        for(let i = 0; i < winningCombinations.length; i++) {
            const [a,b,c] = winningCombinations[i];
            if(board[a] && board[a] === board[b] && board[b] === board[c]) {
                return board[a]
            }
        }
        return null
    }

    function reset() {
        setTurns([initialBoard])
        setCurrentTurn(0)
        setXIsNext(true);
        setGameWinner(null);
    }

    function goBack(idx) {
        if(gameWinner && idx !== turns.length - 1) {
            setGameWinner(null)
        }
        setTurns(turns.slice(0, idx + 1));
        setCurrentTurn(idx)
    }

    const nextTurn = currentTurn % 2 === 0 ? "X" : "O";

    return (
        <div className="container">
            <div className="main">
                {gameWinner 
                    ? <p>Winner is {gameWinner}</p> 
                    : <p>Next turn is: {nextTurn}</p>
                }
                <div className="board-row">
                    <Square value={turns[currentTurn][0]} squareClick={() => handleClick(0)} />
                    <Square value={turns[currentTurn][1]} squareClick={() => handleClick(1)} />
                    <Square value={turns[currentTurn][2]} squareClick={() => handleClick(2)} />
                </div>
                <div className="board-row">
                    <Square value={turns[currentTurn][3]} squareClick={() => handleClick(3)} />
                    <Square value={turns[currentTurn][4]} squareClick={() => handleClick(4)} />
                    <Square value={turns[currentTurn][5]} squareClick={() => handleClick(5)} />
                </div>
                <div className="board-row">
                    <Square value={turns[currentTurn][6]} squareClick={() => handleClick(6)} />
                    <Square value={turns[currentTurn][7]} squareClick={() => handleClick(7)} />
                    <Square value={turns[currentTurn][8]} squareClick={() => handleClick(8)} />
                </div>
                <button onClick={reset} style={{marginTop: '10px'}}>Restart</button>
            </div>
            <div className="turns">
                {turns.map((turn, idx) => (
                    <button 
                        onClick={() => goBack(idx)}
                        key={idx}
                    >
                        Go to turn {idx}
                    </button>)
            )}
            </div>
        </div>
    )
}