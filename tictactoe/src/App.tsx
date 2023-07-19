import { useState } from 'react'
import './App.css'

interface CellProps {
  value: string;
  idx: number;
  handleCellClick: Function;
}

function Cell({ value, idx, handleCellClick }: CellProps) {
  return (
      <div 
          className='cell'
          onClick={() => handleCellClick(idx)}
      >
          {value}
      </div>
  )
}


const initialState = [
  ['', '', '', '', '', '', '', '', '']
]

function App() {
  const [history, setHistory] = useState(initialState);
  const [turnHistory, setTurnHistory] = useState<Array<string>>(['O']);
  const [currentBoard, setCurrentBoard] = useState<number>(0);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [title, setTitle] = useState("")

  function checkAnswer(board: Array<string>) {
    let winner = null;

    // check columns
    if(board[0] && board[0] === board[3] && board[3] === board[6]) winner = board[0];
    else if(board[1] && board[1] === board[4] && board[4] === board[7]) winner = board[7];
    else if(board[2] && board[2] === board[5] && board[5] === board[8]) winner = board[8];

    //check rows
    else if(board[0] && board[0] === board[1] && board[1] === board[2]) winner = board[0];
    else if(board[3] && board[3] === board[4] && board[4] === board[5]) winner = board[5];
    else if(board[6] && board[6] === board[7] && board[7] === board[8]) winner = board[8];

    // check diagonals
    else if(board[0] && board[0] === board[4] && board[4] === board[8]) winner = board[0];
    else if(board[2] && board[2] === board[4] && board[4] === board[6]) winner = board[2];

    console.log(winner)

    if(winner) {
      setTitle(`Winner is ${winner}`);
    } else if(!winner && board.some(el => el === "") === false) {
      setTitle("There is no winner")
    }
  }


  function handleHistory(option: string) {
    if(option === 'forward' && currentBoard < history.length - 1) {
      setCurrentBoard(currentBoard => currentBoard + 1);
    } else if(option === 'backward' && currentBoard > 0) {
      setCurrentBoard(currentBoard => currentBoard - 1);
    }
  }


  function handleCellClick(idx: number) {
    if(history[currentBoard][idx]) return;
    if(currentBoard != history.length - 1) return;

    // duplicate history and add new move to board
    let nextHistory = history.map(arr => arr.slice());
    let nextBoard = nextHistory[currentBoard];
    turnHistory[currentTurn] === 'O' ? nextBoard[idx] = 'X' : nextBoard[idx] = '0';

    // check for solutions
    checkAnswer(nextBoard)

    // add new board to history
    setCurrentBoard(currentBoard => currentBoard + 1);
    setHistory([...history, nextBoard]);

    // add turn to turn history
    let nextTurn = turnHistory[currentTurn] === 'X' ? 'O' : 'X';
    setTurnHistory([...turnHistory, nextTurn]);
    setCurrentTurn(currentTurn => currentTurn + 1);
  }


  return (
    <div className='main'>
      <h4>{title}</h4>
      <div className='board'>
        {history[currentBoard].map((value, idx) =>
          <Cell
            key={idx}
            value={value}
            idx={idx}
            handleCellClick={handleCellClick}
          />
        )}
      </div>
      <div className='history'>
        <button onClick={() => handleHistory('backward')}>Backward</button>
        <button onClick={() => handleHistory('forward')}>Forward</button>
      </div>
    </div>
  )
}

export default App;
