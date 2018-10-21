import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './style.css';
import { clone } from '../utils/deepClone'; 

const x = 3;
const y = 3;
const NONE = "none";
const PLAYER_ONE = "X";
const PLAYER_TWO = "O";

export class TickTackToe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: new Array(x * y).fill(null),
      possibileWins: this.generatePossibleWins(),
      history: [],
      turn: true,
      winner: null,
    }
  }

  generatePossibleWins() {
    var wins = [];
    var cols = new Array(y);
    for(var i = 0; i < x; i++) {
      var row = [];
      for(var j = 0; j < y; j++) {
        if(i === 0) { cols[j] = [] }
        var index = (i * x) + j;
        row.push(index);
        cols[j].push(index);
        if(i === x - 1) { wins.push(cols[j]); }
      }
      wins.push(row);
    }
    return wins;
  }

  createBoard() {
    var board = [];
    for(var i = 0; i < y; i++) {
      board.push(<div key={i}>{ this.getRow(i * y) }</div>);
    }
    return board;
  }

  getRow(offset) {
    var row = [];
    for(var i = 0; i < x; i++) {
      row.push(<span key={i}>{ this.getGrid(i + offset) }</span>);
    }
    return row;
  }

  getGrid(index) {
    return (
      <Button id={index} className="grid-button" onClick={(e) => this.clickHandler(e)}>
        { this.state.board[index] || "Z" }
      </Button>
    );
  }

  stalemate(history) {
    return history.length === x * y ? NONE : null;
  }

  clickHandler(e) {
    var index = e.currentTarget.id;
    var board = clone(this.state.board);
    if(!board[index]) {
      var history = clone(this.state.history);
      history.push(index);
      board[index] = this.state.turn ? PLAYER_ONE : PLAYER_TWO;
      // var winner = this.stalemate(history) || this.iteratePossibilities(board, this.state.wins);
      this.setState({
        history,
        board,
        turn: !this.state.turn,
        // winner
      });
    }
  }

  generateMessage(winner, turn) {
    if(!winner) {
      return `Turn: ${ turn ? PLAYER_ONE : PLAYER_TWO }`; 
    }
    else if(winner === NONE) {
      return "DRAW!";
    }
    else {
      return `WINNER: ${ winner }`;
    }
  }

  render() {
    return (
      <div>
        <h1>
          { this.generateMessage(this.state.winner, this.state.turn) }
        </h1>
        { this.createBoard() }
      </div>
    );
  }
}

export default TickTackToe;
