import React, { Component } from 'react';
import GridButton from './mSButton';
import Board, { WINNER, LOSER, IN_PROGRESS } from '../board/board';
import { clone } from '../utils/deepClone';
import './style.css';

const x = 10;
const y = 10;
const totalMines = 20;

export class MineSweeper extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      board: this.initBoard(),
      count: 0,
      flags: 0,
      gameStatus: IN_PROGRESS
    }
  }

  validateSpot(col, row, board) {
    if(col >= 0 && col < x && row >= 0 && row < y && !board[col][row].mine) {
      board[col][row].count++;
    }
  }

  initBoard() {
    if(x * y < totalMines) { return null; }
    var count = 0;
    var board = new Array(x);
    for (var i = 0; i < x; i++) {
      board[i] = new Array(y);
      for (var j = 0; j < y; j++) {
        board[i][j] = { 
          mine: false, 
          count: 0, 
          visible: false,
          flag: false,
        };
      }
    }
    while (count < totalMines) {
      var a = Math.floor(Math.random() * x);
      var b = Math.floor(Math.random() * y);
      if (!board[a][b].mine) {
        for (var c = -1; c < 2; c++) {
          for (var d = -1; d < 2; d++) {
            this.validateSpot(a + c, b + d, board);
          }
        }
        board[a][b].mine = true;
        count++;
      }
    }
    return board;
  }

  gridShowMines(board) {
    board.forEach(arr => {
      arr.forEach(grid => {
        if(grid.mine) { grid.visible = true; }
      });
    });
  }

  gridHandlerRec(board, col, row) {
    var count = 0;
    if(col >= 0 && col < x && row >= 0 && row < y && !board[col][row].visible && !board[col][row].mine && !board[col][row].flag) {
      board[col][row].visible = true;
      count = 1;
      if(!board[col][row].count) {
        for(var i = -1; i < 2; i++) {
          for(var j = -1; j < 2; j++) {
            count += this.gridHandlerRec(board, col + i, row + j);
          }
        }
      }
    }
    return count;
  }

  gridClickHandler(e, col, row) {
    var state = clone(this.state);
    if(state.board[col][row].mine) { 
      this.gridShowMines(state.board);
      state.gameStatus = LOSER;
    }
    else {
      state.count += this.gridHandlerRec(state.board, col, row);
      state.gameStatus = (x * y - totalMines === state.count) ? WINNER : state.gameStatus;
    }
    this.setState({ ...state });
  }

  toggleFlag(e, col, row) {
    e.preventDefault();
    var state = clone(this.state);
    if(state.flags < totalMines || state.board[col][row].flag) {
      state.board[col][row].flag = !state.board[col][row].flag;
      state.flags += state.board[col][row].flag ? 1 : -1;
      this.setState({ ...state });
    }
  }

  render(){
    return (
      <div>
        <Board
          width={x}
          height={y}
          board={this.state.board}
          gameStatus={this.state.gameStatus}
          onClickHandler={(e, col, row) => this.gridClickHandler(e, col, row)}
          rightClickHandler={(e, col, row) => this.toggleFlag(e, col, row)}
          button={GridButton}
          />
      </div>
    );
  }
}

export default MineSweeper;