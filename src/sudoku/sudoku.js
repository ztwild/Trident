import React, { Component } from 'react';
import Board from '../board/board';
import Button from './sudokuButton';
// import clone from '../utils/deepClone'; 

const x = 9;
const y = 9;
const vals = 9;
const difficulty = {
  EXTREME: 24,
  HARD: 24,
  MEDIUM: 35,
  EASY: 44,
}
// const initialGrid = {
//   initial: null,
//   options: [],
//   set: null
// }

export class Sudoku extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.initBoard()
    }
  }

  initBoard() {
    var board = new Array(x);
    for(var i = 0; i < x; i++) {
      board[i] = new Array(y).fill(null);
    }

    var count = 0;
    while(count < difficulty.HARD) {
      var a = Math.floor(Math.random() * x);
      var b = Math.floor(Math.random() * y);
      if(!board[a][b]) {
        var val = Math.ceil(Math.random() * vals);
        while(!this.validatePosition(a, b, board, val)) {
          val = Math.ceil(Math.random() * vals);
        }
        board[a][b] = val;
        count++;
      }
    }
    return board;
  }

  validatePosition(row, col, board, val) {
    const sqrt = Math.sqrt(vals);
    for(var i = 0; i < sqrt; i++) {
      for(var j = 0; j < sqrt; j++) {
        const colOffset = Math.floor(col / sqrt) * sqrt;
        const rowOffset = Math.floor(row / sqrt) * sqrt;
        const colAlt = colOffset + i;
        const rowAlt = rowOffset + j;
        if(col !== colAlt && row !== rowAlt && board[colAlt][rowAlt] === val) {
          return false;
        }
      }
    }
    
    for(i = 1; i < vals; i++) {
      var altCol = (col + i) % vals;
      var altRow = (row + i) % vals;
      if(board[row][altCol] === val || board[altRow][col] === val) {
        return false;
      }
    }
    return true;
  }

  render() {
    return(
      <Board
        board={this.state.board}
        width={x}
        height={y}
        onClickHandler={() => {}}
        rightClickHandler={() => {}}
        button={Button}
      />
    );
  }
}

export default Sudoku;